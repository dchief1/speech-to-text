import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDatabase } from "./config/database";
import { PREFIXES } from "./config/endPoints";
import cookieParser from "cookie-parser";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import morgan from "morgan";
import userRoute from "./routes/user.route";

// Establish connection to DB
connectDatabase();

const app: Express = express();

// Set HTTP security headers
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(cookieParser());

// erro middleware
// app.use(notFound);
app.use(errorHandlerMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello !!");
});

app.use(PREFIXES.API + PREFIXES.USER, userRoute);

// app.use(PREFIXES.API + PREFIXES.ADMIN, adminRoute);

export default app;
