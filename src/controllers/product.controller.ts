import { Request, Response } from "express";
import {
	getProducts,
	addProduct,
	getProduct,
	deleteProduct,
	updateProduct,
} from "../services/product.service";

export async function createProductController(req: Request, res: Response) {
	const { brandId, categoryIds } = req.body;

	addProduct(req.body, brandId, categoryIds)
		.then((data) => {
			return res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function getProductController(req: Request, res: Response) {
	const { id } = req.params;

	getProduct(parseInt(id))
		.then((data) => {
			return res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function getProductsController(req: Request, res: Response) {
	const filter = req.query.filter as string | undefined;
	const filterCategoryId = parseInt(
		req.query.filterCategoryId as string | undefined
	);
	const filterBrandId = parseInt(
		req.query.filterBrandId as string | undefined
	);
	const isHomeProduct = req.query.isHomeProductFilter;
	let isHomeProductFilter: boolean | undefined = undefined;

	let orderBy = null;
	if (req.query.orderBy) {
		orderBy = {
			key: (req.query.orderBy as string).split(":")[0],
			value: (req.query.orderBy as string).split(":")[1] as
				| "ASC"
				| "DESC",
		};
	}

	if (isHomeProduct !== undefined) {
		const lowerHomeProduct = isHomeProduct.toString().toLowerCase();
		if (lowerHomeProduct === "true" || lowerHomeProduct === "false") {
			isHomeProductFilter = lowerHomeProduct === "true";
		}
	}

	const _filterCategoryId = isNaN(filterCategoryId) ? null : filterCategoryId;
	const _filterBrandId = isNaN(filterBrandId) ? null : filterBrandId;

	const page = parseInt(req.query.page as string) || 1;
	const pageSize = parseInt(req.query.pageSize as string) || 10;
	const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : null;
	const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : null;

	getProducts(
		filter,
		isHomeProductFilter,
		_filterCategoryId,
		_filterBrandId,
		minPrice,
		maxPrice,
		page,
		pageSize,
		orderBy
	)
		.then((resp) => {
			const { data, maxPages, totalItems } = resp;

			return res.status(200).json({
				data,
				maxPages,
				totalItems,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function updateProductController(req: Request, res: Response) {
	const { brandId, categoryIds } = req.body;
	const body = req.body;
	const { id } = req.params;

	updateProduct(
		parseInt(id),
		body,
		parseInt(brandId),
		categoryIds
	)
		.then((data) => {
			return res.status(200).json({
				message: "Producto Modificado",
				data,
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}

export async function deleteProductController(req: Request, res: Response) {
	const { id } = req.params;

	deleteProduct(parseInt(id))
		.then(() => {
			return res.status(200).json({
				message: "Product eliminado",
			});
		})
		.catch((err) => {
			return res.status(400).send({ error: err.message });
		});
}
