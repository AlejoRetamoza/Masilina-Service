import { Router } from 'express';
import { tokenValidation } from '../middlewares/verifyToken';

const router: Router = Router();

import {
	getCategoryController,
	getCategoriesController,
	createCategoryController,
	deleteCategoryController,
	updateCategoryController,
} from '../controllers/category.controller';

router.get('/', getCategoriesController);

router.get('/:id', 	
	tokenValidation, 
	getCategoryController
);

router.post('/', 
	tokenValidation, 
	createCategoryController
);


router.put('/:id', 
	tokenValidation, 
	updateCategoryController
);

router.delete('/:id', 
	tokenValidation, 
	deleteCategoryController
);

export default router;