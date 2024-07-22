import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import BadRequestError from "../errors/bad-request";
import { validateFileType } from "./constant";
import configs from "../config/config";

AWS.config.update({
  accessKeyId: configs.AWS_ACCESS_KEY_ID,
  secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
  region: configs.BUCKET_REGION,
});

//S3 instance
const s3 = new AWS.S3();

export const uploadToS3 = async (file: any) => {
  if (!file) {
    throw new BadRequestError("No file provided for upload.");
  }

  const key = `${uuidv4()}_${file.mimetype.replace("/", "-")}`;

  console.log(key);

  const params = {
    Bucket: "gbubemi",
    Key: key,
    Body: file.data,
    ContentType: file.mimetype,
  };

  try {
    // Upload the file to S3
    await s3.upload(params).promise();

    // Return the S3 URL
    return `https://${params.Bucket}.s3.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export const uploadMultipleAws = async (files: any) => {
  try {
    const uploadedUrls = [];

    for (const file of files) {
      const maxFileSize = 70 * 1024 * 1024; // 70MB in bytes
      if (file.size > maxFileSize) {
        throw new BadRequestError("File size exceeds the maximum allowed limit (70MB).");
      }

      if (!validateFileType(file)) {
        throw new BadRequestError(
          "Unsupported file type. Only JPEG, PNG, and GIF files are allowed."
        );
      }

      const key = `${uuidv4()}_${file.mimetype.replace("/", "-")}`;

      console.log(key);

      const params = {
        Bucket: "gbubemi",
        Key: key,
        Body: file.data,
        ContentType: file.mimetype,
      };

      // Upload the file to S3
      const { Location } = await s3.upload(params).promise();
      uploadedUrls.push(Location);
      // return uploadedUrls;
    }
    return uploadedUrls;
  } catch (error) {
    console.error("Error uploading files to AWS S3:", error);
    throw error;
  }
};
