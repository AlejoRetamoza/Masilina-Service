import { Brackets } from "typeorm";
import { Product } from "../models/product";

export async function getAll(
    filter?: string,
    isHomeProductFilter?:boolean , 
    filterCategoryId?: number | null,
    filterBrandId?: number | null,
    minPrice?:number | null,
    maxPrice?:number | null,
    page: number = 1,
    pageSize: number = 10,
    orderBy?: { key: string; value: 'ASC' | 'DESC' } | null 
) {
    filter = filter ? filter.toLowerCase() : "";

    const query = Product.createQueryBuilder("product")
        .leftJoinAndSelect("product.brand", "brand")
        .leftJoinAndSelect("product.categories", "productCategory")
        .leftJoinAndSelect("productCategory.category", "category")

    if (filter) {
        query.andWhere(
            new Brackets((qb) => {
                qb.where("LOWER(product.name) LIKE :filter", { filter: `%${filter}%` })
                  .orWhere("LOWER(brand.name) LIKE :filter", { filter: `%${filter}%` })
                  .orWhere("LOWER(category.name) LIKE :filter", { filter: `%${filter}%` });
            })
        );
    }

    if (isHomeProductFilter !== undefined) {
		query.andWhere("product.isHomeProduct = :isHomeProductFilter", {
			isHomeProductFilter,
		});
	}

    if (filterCategoryId) {
        query.andWhere("category.id = :categoryId", { categoryId: filterCategoryId });
    }

    if (filterBrandId) {
        query.andWhere("brand.id = :brandId", { brandId: filterBrandId });
    }

    if (minPrice) {
		query.andWhere("product.price >= :minPrice", { minPrice });
	}
	if (maxPrice ) {
		query.andWhere("product.price <= :maxPrice", { maxPrice });
	}

    if (orderBy) {
        const allowedKeys = [
            'name',
            'price',
        ];

        const sortKey = allowedKeys.includes(orderBy.key) ? `product.${orderBy.key}` : 'product.name';
        const sortOrder = orderBy.value.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        query.orderBy(sortKey, sortOrder);
    } 

    const totalItems = await query.getCount();

    query.skip((page - 1) * pageSize).take(pageSize);

    const data = await query.getMany();

    const maxPages = Math.ceil(totalItems / pageSize);

    return { data, totalItems, maxPages };
}

export async function getOne(id: number) {
	return Product.findOne({
		where: [{ id }],
		relations: [ "brand", "categories", "categories.category"]
	});
}

export async function add(product: Product) {
	return Product.save({
		...product,
	});
}

export async function update(id: number, product: Product) {
	return Product.save({
		id,
		...product,
	});
}

export async function productExists(name: string) {
	return Product.findOne({
		where: [{ name }]
	});
}

export async function remove(product: Product) {
	return Product.softRemove(product);
}
