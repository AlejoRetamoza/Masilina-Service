import { Request, Response } from "express";
import {
	getProjects,
	addProject,
	updateProject,
	getProject,
	deleteProject,
	updateProjectOrder
} from "../services/project.service";

export async function createProjectController(req: Request, res: Response) {
	addProject(req.body)
		.then((data) => {
			return res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function getProjectsController(req: Request, res: Response) {
	const { inProgress, count } = req.query;

	const _inProgress = inProgress === "true" ? true : false;
	const _count = parseInt(count as string) || 0;

	getProjects(_inProgress, _count)
		.then((data) => {
			return res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function getProjectController(req: Request, res: Response) {
	const { id } = req.params;

	getProject(parseInt(id))
		.then((data) => {
			return res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function deleteProjectController(req: Request, res: Response) {
	const { id } = req.params;

	deleteProject(parseInt(id))
		.then((data) => {
			return res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function updateProjectsController(req: Request, res: Response) {
	const body = req.body;
	const { id } = req.params;

	updateProject(parseInt(id), body)
		.then((data) => {
			return res.status(200).json({
				message: "Project updated",
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function updateProjectOrderController(req: Request, res: Response) {
	const body = req.body.projects;

	updateProjectOrder(body)
		.then((data) => {
			return res.status(200).json({
				message: "Project order updated",
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}
