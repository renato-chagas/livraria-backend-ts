import { Router } from 'express';
import { AuthorController } from '../controllers/authorController.js';

const router = Router();

router.post('/', AuthorController.create);
router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getById);
router.put('/:id', AuthorController.update);
router.delete('/:id', AuthorController.delete);

export default router;
