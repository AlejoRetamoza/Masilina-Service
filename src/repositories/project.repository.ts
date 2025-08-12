import { Project } from "../models/project";

export async function getAll(inProgress: boolean = false, count: number) {
	if (inProgress) {
		return Project.find({
			where: { inProgress: true },
			order: { order: 'ASC' },
			take: count > 0 ? count : undefined
		});
	}

	return Project.find({
		order: {
			order: 'ASC'
		},
		take: count > 0 ? count : undefined
	});
}

export async function getOne(id: number) {
	return Project.findOne({ where: { id } });
}

export async function getLastOrder() {
	return Project.find({ order: { order: 'DESC' }, take: 1 });
}

export async function add(project: Project) {
	return Project.save({
		...project,
	});
}

export async function remove(id: number) {
	return Project.delete({ id });
}

export async function update(id: number, project: Project) {
	return Project.save({
		id,
		...project,
	});
}

export async function updateBulk(project: Partial<Project>[]) {
	return Project.save(project);
}