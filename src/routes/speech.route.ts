import { Router } from "express";
import multer from "multer";
import { END_POINTS } from "../config/endPoints";
import { uploadAudio } from "../controllers/speech/speech.controller";

const speechRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

speechRoute.post(END_POINTS.VOICE_TEXT, upload.single("file"), uploadAudio);

export default speechRoute;
