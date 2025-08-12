import { Router } from "express";

const router: Router = Router();

import {
	sendMailController,
} from "../controllers/email.controller";

router.post("/", sendMailController);

export default router;
