import axios from "axios";
import { connectDb } from "../config/database";
import { speechToText } from "../db/schema";
import FormData from "form-data";
import configs from "../config/config";
import fs from "fs";

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const transcribeAudioFromUrl = async (audioPath: string): Promise<string> => {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(audioPath));
      form.append("model", "whisper-1");

      const response = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${configs.OPENAI_API_KEY}`,
          },
        }
      );

      return response.data.text;
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        // Handle rate limiting
        attempt++;
        const delay = RETRY_DELAY * Math.pow(2, attempt);
        console.warn(`Rate limited. Retrying in ${delay}ms...`);
        await sleep(delay);
      } else {
        console.error("Error transcribing audio:", error);
        throw error;
      }
    }
  }

  throw new Error("Max retries reached. Unable to transcribe audio.");
};

export const transcribeText = async (userId: number, fileName: any) => {
  const result = await transcribeAudioFromUrl(fileName);

  const newSpeech = await connectDb.insert(speechToText).values({
    userId,
    text: result,
    fileName,
  });

  return {
    status: true,
    message: `Speech created`,
    data: newSpeech,
  };
};
