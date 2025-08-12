import { Router } from "express";
import path from "path";
import multer from "multer";
import fs from "fs";

import { downloadImage, uploadImage } from "../controllers/files.controller";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadPath = path.resolve(__dirname, "../../files");

		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}

		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now().toString() + path.extname(file.originalname));
	},
});

const maxSize = 10 * 1024 * 1024;

const upload = multer({ storage, limits: { fileSize: maxSize } });

const router: Router = Router();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/download/:file_path", downloadImage);

export default router;
