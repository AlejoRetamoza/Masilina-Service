import { Category } from "../models/category";

import {
	add,
	getAll,
	getOne,
	update,
	remove,
	categoryExists,
} from "../repositories/category.repository";

export async function createCategory(category: Category) {
	const _categoryExists = await categoryExists(category.name);
	if (_categoryExists && !_categoryExists.deletedAt) throw new Error(`Ya existe una categoría con el nombre ${category.name}`);

	
	if (_categoryExists && _categoryExists.deletedAt) {
		category.deletedAt = null;

		return update(_categoryExists.id, category);
	}

	return add(category);
}

export async function getCategory(id: number) {
	return getOne(id);
}

export async function getCategories(
	filter?: string,
	page?: number,
	pageSize?: number
) {
	return getAll(filter, page, pageSize);
}

export async function updateCategory(id: number, category: Category) {
	const categoryExist = await getOne(id);

	if(!categoryExist) throw new Error("La categoría no existe");
	
	return update(id, category);
}

export async function deleteCategory(id: number) {
	const category = await getOne(id);

	if(!category) throw new Error("La categoría no existe");

	return remove(category);
}
