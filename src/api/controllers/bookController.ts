import { Request, Response } from 'express';
import { Book, Author, Category, Publisher } from '../models/index.js';

export class BookController {
  static async createBook(req: Request, res: Response) {
    try {
      const { title, price, isbn, synopsis, authorId, publisherId, categoryId } = req.body;

      const newBook = await Book.create({
        title,
        price,
        isbn,
        synopsis,
        authorId,
        publisherId,
        categoryId
      });

      const bookWithDetails = await Book.findByPk(newBook.id, {
        include: [
          { model: Author, as: 'author' },
          { model: Publisher, as: 'publisher' },
          { model: Category, as: 'category' }
        ]
      });

      res.status(201).json(bookWithDetails);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Listar tm,.;odos os livros com paginação
  static async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Book.findAndCountAll({
        limit,
        offset,
        include: [
          { model: Author, as: 'author' },
          { model: Publisher, as: 'publisher' },
          { model: Category, as: 'category' }
        ]
      });

      res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        items: rows
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Buscar livro por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id, {
        include: [
          { model: Author, as: 'author' },
          { model: Publisher, as: 'publisher' },
          { model: Category, as: 'category' }
        ]
      });

      if (!book) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      res.status(200).json(book);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Atualizar livro
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const [updated] = await Book.update(req.body, {
        where: { id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      const updatedBook = await Book.findByPk(id, {
        include: [
          { model: Author, as: 'author' },
          { model: Publisher, as: 'publisher' },
          { model: Category, as: 'category' }
        ]
      });
      res.status(200).json(updatedBook);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Deletar livro
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await Book.destroy({
        where: { id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
