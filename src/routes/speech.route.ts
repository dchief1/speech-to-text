import { Router } from "express";
import { END_POINTS } from "../config/endPoints";
import { SpeechText } from "../controllers/speech/speech.controller";
import { verifyToken } from "../middleware/authMiddleWare";

const speechRoute = Router();

speechRoute.post(END_POINTS.V_TEXT, verifyToken, SpeechText);

export default speechRoute;
