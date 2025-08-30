import { Router } from 'express';
import { tokenValidation } from '../middlewares/verifyToken';

const router: Router = Router();

import {
	getBrandController,
	getBrandsController,
	createBrandController,
	deleteBrandController,
	updateBrandController,
} from '../controllers/brand.controller';


router.get('/', getBrandsController);

router.get('/:id', 
	tokenValidation, 
	getBrandController
);

router.post('/', 
	tokenValidation, 
	createBrandController
);


router.put('/:id', 	
	tokenValidation, 
	updateBrandController
);

router.delete('/:id', 
	tokenValidation, 
	deleteBrandController
);

export default router;