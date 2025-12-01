import { Request, Response } from 'express';
import { Author } from '../models/index.js';

export class AuthorController {
    static async create(req: Request, res: Response) {
        try {
            const { name, bio, phone, email } = req.body;

            const newAuthor = await Author.create({
                name,
                bio,
                phone,
                email,
            });

            res.status(201).json(newAuthor);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const authors = await Author.findAll();
            res.status(200).json(authors);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const author = await Author.findByPk(id);

            if (!author) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }

            res.status(200).json(author);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [updated] = await Author.update(req.body, {
                where: { id }
            });

            if (!updated) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }

            const updatedAuthor = await Author.findByPk(id);
            res.status(200).json(updatedAuthor);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await Author.destroy({
                where: { id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Autor não encontrado' });
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
