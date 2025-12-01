import { Router } from 'express';
import { PublisherController } from '../controllers/publisherController.js';

const router = Router();

router.post('/', PublisherController.create);
router.get('/', PublisherController.getAll);
router.get('/:id', PublisherController.getById);
router.put('/:id', PublisherController.update);
router.delete('/:id', PublisherController.delete);

export default router;