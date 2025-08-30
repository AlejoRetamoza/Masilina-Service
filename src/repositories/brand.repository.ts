import { Brand } from "../models/brand";
import { ILike } from "typeorm";

export async function add(brand: Brand) {
	return Brand.save({
		...brand,
	});
}

export async function getOne(id: number) {
	return Brand.findOne({
		where: [
			{
				id,
			},
		],
	});
}

export async function getAll(filter?: string) {
	filter = filter ? filter.toLowerCase() : "";

	return Brand.find({
		where: [
			{  name: ILike(`%${filter}%`) },	
		],
	});
}

export async function getByIds(ids?: number[]) {
	const where = [];

	if (ids) {
		const brandsIds = ids.map((id) => ({ id }));
		where.push(brandsIds);
	}
	
	return Brand.find({
		where,
	});
}

export async function update(id: number, brand: Brand) {
	return Brand.save({
		id,
		...brand,
	});
}

export async function remove(brand: Brand) {
	return Brand.softRemove(brand);
}

export async function brandExist(name: string) {
	return Brand.findOne({
		where: [
			{
				name: name,
			},
		],
	});
}

