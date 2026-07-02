import { Router } from 'express';
import postOrder from '../controllers/orders';
import { validateOrderBody } from '../middlewares/validations';

const router = Router();

router.post('/', validateOrderBody, postOrder);

export default router;
