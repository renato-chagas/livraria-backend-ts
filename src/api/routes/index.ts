import { Router } from 'express';

import bookRoutes from './book.routes.js';
import authorRoutes from './author.routes.js';
import categoryRoutes from './category.routes.js';
import publisherRoutes from './publisher.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);
router.use('/categories', categoryRoutes);
router.use('/publishers', publisherRoutes);
router.use('/users', userRoutes);

export default router;
