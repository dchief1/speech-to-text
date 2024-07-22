import multer from "multer";
import path from "path";
import fs from "fs";
import { validateFileType } from "./constant";
import BadRequestError from "../errors/bad-request";
import express from "express";

// Ensure the Audio directory exists
const uploadPath = path.join(__dirname, "../Audio");
console.log(uploadPath, "path");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (!validateFileType(file)) {
    return cb(
      new BadRequestError("Unsupported file type. Only audio files are allowed."),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
