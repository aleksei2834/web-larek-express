import { Router } from 'express';
import { getProducts, postProduct } from '../controllers/products';
import { validateProductBody } from '../middlewares/validations';

const router = Router();

router.get('/', getProducts);
router.post('/', validateProductBody, postProduct);

export default router;
