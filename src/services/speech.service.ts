import axios from "axios";
import { connectDb } from "../config/database";
import { speechToText } from "../db/schema";
import { InferInsertModel } from "drizzle-orm";
import FormData from "form-data";
import configs from "../config/config";

// Define the type for SpeechToText model
type NewSpeechToText = InferInsertModel<typeof speechToText>;

async function transcribe(file: Buffer, filename: string): Promise<string> {
  try {
    const form = new FormData();
    form.append("file", file, { filename });
    form.append("model", "whisper-1");

    const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${configs.OPENAI_API_KEY}`,
      },
    });

    return response.data.text;
  } catch (error) {
    console.error("Error during speech-to-text conversion:", error);
    throw new Error("Failed to convert speech to text");
  }
}

export async function convertSpeechToText(
  userId: number,
  audioFile: Buffer,
  filename: string
): Promise<string> {
  try {
    // Transcribe the audio file
    const text = await transcribe(audioFile, filename);

    // Save transcription to the database
    await connectDb
      .insert(speechToText)
      .values({
        userId,
        text,
        createdAt: new Date(),
      })
      .returning();

    return text;
  } catch (error) {
    console.error("Error during speech-to-text conversion:", error);
    throw new Error("Failed to convert speech to text");
  }
}
