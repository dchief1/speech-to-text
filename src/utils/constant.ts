import configs from "../config/config";
import { CustomRedis } from "./redis";
import { Request, Response, NextFunction } from "express";
import mime from "mime-types";

const redisUrl = configs.REDIS_URL;
console.log(redisUrl);
export const redis = new CustomRedis(redisUrl);

if (process.env.NODE_ENV === "development") {
  console.log("Redis", "Connection established to Redis instance ...");
}

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const validateFileType = (file: any): boolean => {
  const allowedMimeTypes = [
    "audio/mpeg", // MP3
    "audio/wav", // WAV
    "audio/x-wav", // WAV (alternative)
    "audio/ogg", // OGG
    "audio/x-ms-wma", // WMA
    "audio/aac", // AAC
    "audio/mp4", // MP4
    "audio/flac", // FLAC
    "audio/x-aiff", // AIFF
    "audio/midi",
  ];
  const fileMimeType = mime.lookup(file.originalname); // Lookup MIME type by filename

  // Check if MIME type is valid and within the allowed list
  fileMimeType && allowedMimeTypes.includes(fileMimeType);

  return true;
};
