import { Brand } from "../models/brand";

import {
	add,
	getAll,
	getOne,
	update,
	remove,
	brandExist,
} from "../repositories/brand.repository";

export async function createBrand(brand: Brand) {
	const _brandExist = await brandExist(brand.name);
	if (_brandExist) throw new Error(`Ya existe una marca con el nombre ${brand.name}`);

	return add(brand);
}

export async function getBrand(id: number) {
	return getOne(id);
}

export async function getBrands(
	filter?: string,
) {
	return getAll(filter);
}

export async function updateBrand(id:number, brand: Brand) {
	const brandExist = await getOne(id);
	if(!brandExist) throw new Error("La marca no existe");
    
	return update(id, brand);
}

export async function deleteBrand(id: number) {
	const brand = await getOne(id);

	if(!brand) throw new Error("La marca no existe");

	return remove(brand);
}
