import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedImageInfo {
    imageId: string;
    imagePath: string;
    imageUrl: string;
    originalName: string;
    size: number;
    mimetype: string;
}

@Injectable()
export class UploadService {
    private readonly uploadPath = './uploads/service-orders';

    constructor() {
        // Cria a pasta de uploads se não existir
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
    }

    // Configuração do Multer
    getMulterOptions() {
        return {
            storage: diskStorage({
                destination: this.uploadPath,
                filename: (req, file, callback) => {
                    const imageId = uuidv4();
                    const ext = extname(file.originalname);
                    callback(null, `${imageId}${ext}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return callback(
                        new BadRequestException('Apenas imagens PNG, JPG e JPEG são permitidas!'),
                        false,
                    );
                }
                callback(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024, // 5MB
            },
        };
    }

    // Processa o arquivo após upload
    processUploadedFile(file: Express.Multer.File): UploadedImageInfo {
        if (!file) {
            throw new BadRequestException('Nenhum arquivo foi enviado!');
        }

        const imageId = path.parse(file.filename).name; // UUID sem extensão
        const imagePath = file.path;
        const imageUrl = `/uploads/service-orders/${file.filename}`;

        return {
            imageId,
            imagePath,
            imageUrl,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
        };
    }

    // Deleta uma imagem (útil para quando deletar Service Order)
    deleteImage(imageId: string): boolean {
        try {
            const files = fs.readdirSync(this.uploadPath);
            const fileToDelete = files.find(file => file.startsWith(imageId));

            if (fileToDelete) {
                fs.unlinkSync(path.join(this.uploadPath, fileToDelete));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
            return false;
        }
    }

    // Verifica se imagem existe
    imageExists(imageId: string): boolean {
        const files = fs.readdirSync(this.uploadPath);
        return files.some(file => file.startsWith(imageId));
    }
}