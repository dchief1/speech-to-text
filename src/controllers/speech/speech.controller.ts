import { transcribeText } from "../../services/speech.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant";

export const SpeechText: Controller = async (req, res, next) => {
  try {
    if (!req.file) {
      console.error("No file uploaded. Request file:", req.file);
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "No file uploaded" });
    }

    // Provide details about the uploaded file
    const uploadedFileInfo = {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    };

    console.log("Uploaded file info:", uploadedFileInfo);

    // Path of the uploaded file
    const audioPath = req.file.path;
    const userId = req.user.id;

    try {
      const result = await transcribeText(userId, audioPath);
      res.status(StatusCodes.CREATED).json({
        message: "File uploaded and text transcribed successfully",
        file: uploadedFileInfo,
        data: result,
      });
    } catch (serviceError) {
      console.error("Error in transcribing text:", serviceError);
      next(serviceError);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    next(error);
  }
};
