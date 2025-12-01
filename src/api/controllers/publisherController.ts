import { Request, Response } from 'express';
import { Publisher } from '../models/index.js';

export class PublisherController {
    static async create(req: Request, res: Response) {
        try {
            const { name, address, phone } = req.body;
            const newPublisher = await Publisher.create({ name, address, phone });
            res.status(201).json(newPublisher);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const publishers = await Publisher.findAll();
            res.status(200).json(publishers);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const publisher = await Publisher.findByPk(id);

            if (!publisher) {
                return res.status(404).json({ error: 'Editora não encontrada' });
            }

            res.status(200).json(publisher);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [updated] = await Publisher.update(req.body, {
                where: { id }
            });

            if (!updated) {
                return res.status(404).json({ error: 'Editora não encontrada' });
            }

            const updatedPublisher = await Publisher.findByPk(id);
            res.status(200).json(updatedPublisher);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await Publisher.destroy({
                where: { id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Editora não encontrada' });
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
