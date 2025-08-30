import { Router } from 'express';
import { tokenValidation} from '../middlewares/verifyToken';

const router: Router = Router();

import {
	getProductController,
	getProductsController,
	createProductController,
	deleteProductController,
	updateProductController
} from '../controllers/product.controller';

router.get('/', getProductsController);

router.get('/:id', getProductController);

router.post('/', 	
	tokenValidation, 
	createProductController
);

router.put('/:id', 
	tokenValidation, 
	updateProductController
);

router.delete('/:id', 
	tokenValidation, 
	deleteProductController
);

export default router;