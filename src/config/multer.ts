import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

const allowedExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'svg',
];

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads', 'points' ),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  fileFilter(request: Request, file: Express.Multer.File, callback: Function) {
    const extension = path.extname(file.originalname).replace('.', '');
    
    if(allowedExtensions.includes(extension)) {
      return callback(null, true);
    }

    return callback(new Error('Only images are allowed'));
    
  },
  limits:{
      fileSize: 20 * (1024 * 1024), // max allowed 20Mb
  }
};

export { allowedExtensions };