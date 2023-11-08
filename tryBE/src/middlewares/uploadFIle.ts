import { NextFunction, Request, Response } from "express";
import * as multer from "multer";
import * as dotenv from "dotenv";
dotenv.config();

// Membuat kelas FileUpload untuk menangani unggahan file
export default class FileUpload {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  // Konfigurasi penyimpanan file menggunakan diskStorage
  private storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Menentukan direktori tujuan unggahan file
      cb(null, process.env.DESTINATION);
    },
    filename: function (req, file, cb) {
      // Membuat nama file yang unik berdasarkan timestamp
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  // Membuat objek middleware Multer dengan konfigurasi penyimpanan
  private uploadFile = multer({ storage: this.storage });

  // Metode untuk menangani unggahan file
  public handleUpload(req: Request, res: Response, next: NextFunction) {
    this.uploadFile.single(this.fileName)(req, res, function (error: any) {
      // Mengatasi kesalahan yang mungkin terjadi selama unggahan
      if (error) {
        return res.status(400).json({ error });
      }

      // Cek jika 'req.file' (file yang diunggah) tidak ada
      if (!req.file) {
        // Tidak ada file yang diunggah, lanjutkan tanpa kesalahan
        next();
        return;
      }

      // Jika ada file yang diunggah, lanjutkan dengan pemrosesan file
      res.locals.filename = req.file.filename;
      next();
    });
  }
}
