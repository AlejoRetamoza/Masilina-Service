import { Request, Response } from 'express';
import path from 'path';
import fs from 'node:fs';
import mime from 'mime';

interface MulterRequest extends Request {
    file: any;
}

export function uploadImage(req: MulterRequest, res: Response) {
    
    res.status(200).json({
        status: 'OK',
        image_path: (parseInt(req.file.filename)).toString(),
		type: (req.file.mimetype as string).includes('image') ? 'image' : 'pdf'
    });
}

export function downloadImage(req: Request, res: Response) {
    const directoryPath = path.resolve(__dirname, "../../files");
    const files = fs.readdirSync(directoryPath);
    const file = files.find(f => f.includes(req.params.file_path));
   
    if (file) {
        const filePath = path.resolve(`${directoryPath}/${file}`);
        const mimeType = mime.lookup(filePath) || 'application/octet-stream';

        res.contentType(mimeType);

        res.header('Content-Disposition', `attachment; filename="${file}"`);

        res.status(200).sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending file');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
}