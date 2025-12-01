import { Request, Response } from 'express';
import { Category } from '../models/index.js';

export class CategoryController {
    static async create(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const newCategory = await Category.create({ name });
            res.status(201).json(newCategory);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            res.status(200).json(category);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [updated] = await Category.update(req.body, {
                where: { id }
            });

            if (!updated) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            const updatedCategory = await Category.findByPk(id);
            res.status(200).json(updatedCategory);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await Category.destroy({
                where: { id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
