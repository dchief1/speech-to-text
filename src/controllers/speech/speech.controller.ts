import { Request, Response } from "express";
import { convertSpeechToText } from "../../services/speech.service";
import { StatusCodes } from "http-status-codes";

export async function uploadAudio(req: Request, res: Response) {
  try {
    // Ensure that a file and userId are provided
    if (!req.file || !req.body.userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Missing file or userId",
      });
    }

    // Extract userId and file from the request
    const userId = Number(req.body.userId);
    const file = req.file.buffer;
    const filename = req.file.originalname;

    // Convert speech to text
    const text = await convertSpeechToText(userId, file, filename);

    // Respond with the transcribed text
    res.status(StatusCodes.OK).json({ text });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}
