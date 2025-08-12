import { Router } from "express";

const router: Router = Router();

import {
	createProjectController,
	getProjectsController,
	updateProjectsController,
	getProjectController,
	deleteProjectController,
	updateProjectOrderController
} from "../controllers/project.controller";

router.get("/", getProjectsController);
router.get("/:id", getProjectController);

router.post("/", createProjectController);

router.put('/change-order', updateProjectOrderController);
router.put('/:id', updateProjectsController);

router.delete('/:id', deleteProjectController);

export default router;
