import { Router } from 'express';
import { tokenValidation } from '../middlewares/verifyToken';

const router: Router = Router();

import {
    getUserController,
    getUsersController,
    registerUserController,
    deleteUserController,
    updateUserController,
    loginController
} from '../controllers/user.controller';

router.get('/', tokenValidation, getUsersController);
router.get('/:id', tokenValidation, getUserController);

router.post('/login', loginController);
router.post('/register', registerUserController);

router.put('/:id', tokenValidation, updateUserController);

router.delete('/:id', tokenValidation, deleteUserController);

export default router;