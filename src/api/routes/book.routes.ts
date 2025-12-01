import { Router } from 'express';
import { BookController } from '../controllers/bookController.js';

const router = Router();

router.post('/', BookController.createBook);
router.get('/', BookController.getAll);
router.get('/:id', BookController.getById);
router.put('/:id', BookController.update);
router.delete('/:id', BookController.delete);

export default router;