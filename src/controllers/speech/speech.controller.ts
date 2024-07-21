import { transcribeText } from "../../services/speech.service";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant";
import { uploadToS3 } from "../../utils/upload";

export const SpeechText: Controller = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audio) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "No image uploaded" });
    }

    const audio = req.files.audio;
    const userId = req.user.id;

    const audioUrl = await uploadToS3(audio);
    res.status(StatusCodes.CREATED).json(await transcribeText(userId, audioUrl));
  } catch (error) {
    next(error);
  }
};
