import { Router } from "express";
import { END_POINTS } from "../config/endPoints";
import { SpeechText } from "../controllers/speech/speech.controller";
import { verifyToken } from "../middleware/authMiddleWare";

const speechRoute = Router();

/**
 * @swagger
 * /api/v1/text:
 *   post:
 *     summary: Convert speech to text
 *     tags: [Speech]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer <your-token-here>
 *         description: Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: The audio file to be converted to text
 *     responses:
 *       200:
 *         description: Successfully converted speech to text
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
speechRoute.post(END_POINTS.V_TEXT, verifyToken, SpeechText);

export default speechRoute;
