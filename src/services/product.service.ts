import { getOne, add, productExists, update, remove, getAll } from "../repositories/product.repository";
import { Product } from "../models/product";
import { getOne as getOneBrand} from '../repositories/brand.repository';
import { getByIds as getCategories } from "../repositories/category.repository";
import { ProductCategory } from "../models/product_category";

export async function getProduct(id: number) {
	return getOne(id);
}

export async function getProducts(
	filter?: string,
	isHomeProductFilter?:boolean,
	categoryId?: number,
	brandId?: number,
	minPrice?:number,
	maxPrice?:number,
	page?: number,
	pageSize?: number,
    orderBy?: { key: string; value: 'ASC' | 'DESC' } | null 
) {
	return getAll(filter, isHomeProductFilter,categoryId, brandId,minPrice,maxPrice, page, pageSize, orderBy);
}

export async function addProduct(
	product: Product,
	brandId: number,
	categoryIds?: number[]
) {
	const product_exists = await productExists(product.name);
	const brand = await getOneBrand(brandId);
	
	if (product_exists)
		throw new Error(`Ya existe un producto llamado "${product.name}"`);

	if (!brand) throw new Error(`La marca con ID ${brandId} no existe`);

	product.brand = brand;

	if (categoryIds && categoryIds.length) {
		const categories = await getCategories(categoryIds);
		if (categories.length !== categoryIds.length) {
			throw new Error("Algunas categorías no existen");
		}

		const productCategories = categories.map((category) => {
			const productCategory = new ProductCategory();
			productCategory.category = category;
			return productCategory;
		});

		product.categories = productCategories;
	}
	const savedProduct = await add(product);

	return savedProduct;
}

export async function updateProduct(
	id: number,
	product: Product,
	brandId?: number,
	categoryIds?: number[]
) {
	if(brandId){
		const brand = await getOneBrand(brandId);
		if (!brand) throw new Error(`La marca con ID ${brandId} no existe`);
		product.brand = brand;
	}

	if (categoryIds && categoryIds.length) {
		const categories = await getCategories(categoryIds);
		if (categories.length !== categoryIds.length) {
			throw new Error("Algunas categorías no existen");
		}

		const productCategories = categories.map((category) => {
			const productCategory = new ProductCategory();
			productCategory.category = category;
			return productCategory;
		});

		product.categories = productCategories;
	}

	return update(id, product);
}

export async function deleteProduct(id: number) {
	const product = await getOne(id);

	if (!product) throw new Error("El producto no existe");

	return remove(product);
}