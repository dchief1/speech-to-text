import { SpeechClient, protos } from "@google-cloud/speech";
import { connectDb } from "../config/database";
import { speechToText } from "../db/schema";
import { S3 } from "aws-sdk";
import { PassThrough } from "stream";

const speechClient = new SpeechClient();
const s3 = new S3();

export const extractBucketAndKeyFromUrl = (url: string): [string, string] => {
  console.log(`Parsing URL: ${url}`);
  const match = url.match(/^https:\/\/([^.]+)\.s3\.amazonaws\.com\/(.+)$/);
  if (!match) {
    throw new Error("Invalid S3 URL");
  }
  const bucket = match[1];
  const key = decodeURIComponent(match[2]);
  return [bucket, key];
};

const transcribeAudioFromS3 = async (bucket: string, key: string): Promise<string> => {
  const passThroughStream = new PassThrough();
  const s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();
  s3Stream.pipe(passThroughStream);

  const audioBytes = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    passThroughStream.on("data", (chunk) => chunks.push(chunk));
    passThroughStream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
    passThroughStream.on("error", (err) => reject(err));
  });

  const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
    audio: {
      content: audioBytes,
    },
    config: {
      encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
      sampleRateHertz: 16000,
      languageCode: "en-US",
    },
  };

  const [response] = await speechClient.recognize(request);
  const transcription = response.results
    ?.map((result) => result.alternatives?.[0].transcript)
    .join("\n");

  if (!transcription) {
    throw new Error("Failed to transcribe audio");
  }

  return transcription;
};

export const transcribeText = async (userId: number, bucket: string, key: string) => {
  const result = await transcribeAudioFromS3(bucket, key);

  const newSpeech = await connectDb.insert(speechToText).values({
    userId,
    text: result,
    fileName: key,
  });

  return {
    status: true,
    message: "Speech created",
    data: newSpeech,
  };
};
