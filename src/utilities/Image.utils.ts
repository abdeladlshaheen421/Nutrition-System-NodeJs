import multer from 'multer';
import { Request } from 'express';
import sharp from 'sharp';

const resizeImage = async (
  imagePath: string,
  width: number,
  height: number
): Promise<void> => {
  try {
    await sharp(imagePath).resize(width, height).toFile(imagePath);
  } catch (error) {
    console.log(error);
  }
};
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, '../assets/images/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(null, Date.now() + Math.random() + file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // to be 5MB
  },
});
