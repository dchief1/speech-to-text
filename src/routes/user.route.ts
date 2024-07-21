import { Router } from "express";
import { END_POINTS } from "../config/endPoints";
import { login, register } from "../controllers/user/user.controller";

const userRoute = Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 default: kelechi
 *               email:
 *                 type: string
 *                 default: test1@mailinator.com
 *               password:
 *                 type: string
 *                 default: Test@123
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRoute.post(END_POINTS.REGISTER, register);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: test1@mailinator.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verified
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRoute.post(END_POINTS.LOGIN, login);

export default userRoute;
