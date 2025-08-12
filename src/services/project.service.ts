import { getAll, add, update, getOne, remove, updateBulk, getLastOrder} from "../repositories/project.repository";
import { Project } from "../models/project";

export async function getProjects(inProgress: boolean = false, count: number) {
	return getAll(inProgress, count);
}

export async function getProject(id: number) {
	return getOne(id);
}

export async function addProject(project: Project) {
	const lastOrderProject = (await getLastOrder())[0];

	const _newOrder = lastOrderProject?.order + 1 || 1;

	project.order = _newOrder;

	return add(project);
}

export async function deleteProject(id: number) {
	return remove(id);
}

export async function updateProject(id: number, project: Project) {
	return update(id, project);
}

export async function updateProjectOrder(projects: { id: number, order: number }[]) {
	return updateBulk(projects);
}
