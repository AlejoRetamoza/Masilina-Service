import { Category } from "../models/category";

export async function getAll(filter?: string, page?: number, pageSize?: number) {
    filter = filter ? filter.toLowerCase() : '';

    const queryBuilder = Category.createQueryBuilder('category')
		.where(`(LOWER(category.name) ILIKE :filter)`, { filter: `%${filter}%` });


    const totalItems = await queryBuilder.getCount();

    const maxPages = pageSize > 0 ? Math.ceil(totalItems / pageSize) : 1;

    if (page > 0 && pageSize > 0) {
        const skip = (page - 1) * pageSize;
        queryBuilder.skip(skip).take(pageSize);
    }

    const data = await queryBuilder.getMany();

    return {
        data,
        totalItems,
        maxPages
    };
}

export async function getByIds(categoryIds?: number[]) {
	const where = [];

	if (categoryIds) {
		const whereCategories = categoryIds.map((id) => ({ id }));
		where.push(whereCategories);
	}
	
	return Category.find({
		where
	});
}

export async function getOne(id: number) {
	return Category.findOne({
		where: [{ id }]
	});
}

export async function remove(category: Category) {
	return Category.softRemove(category);
}

export async function add(category: Category) {
	return Category.save({
		...category,
	});
}

export async function update(id: number, category: Category) {
	return Category.save({
		id,
		...category,
	});
}

export async function categoryExists(name: string) {
	return Category.findOne({
		where: [{ name }],
		withDeleted: true
	});
}

