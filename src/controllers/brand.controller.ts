import { Request, Response } from "express";
import {
	createBrand,
	getBrand,
	getBrands,
	updateBrand,
	deleteBrand,
} from "../services/brand.service";

export async function createBrandController(req: Request, res: Response) {
    console.log("a ver")

	createBrand(req.body)
		.then((data) => {
			res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			res.status(400).send({ error: err.message });
		});
}

export async function getBrandController(req: Request, res: Response) {
	const { id } = req.params;

	getBrand(parseInt(id))
		.then((data) => {
			res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			res.status(400).send({ error: err.message });
		});
}

export async function getBrandsController(req: Request, res: Response) {
	const filter = req.query.filter as string | undefined;

	getBrands(filter)
		.then((data) => {
			res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			res.status(400).send({ error: err.message });
		});
}

export async function updateBrandController(req: Request, res: Response) {
	const { id } = req.params;
	const body = req.body;

	updateBrand(parseInt(id), body)
		.then((data) => {
			res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			res.status(400).send({ error: err.message });
		});
}

export async function deleteBrandController(req: Request, res: Response) {
	const { id } = req.params;

	deleteBrand(parseInt(id))
		.then((data) => {
			res.status(200).json({
				data,
			});
		})
		.catch((err) => {
			res.status(400).send({ eror: err.message });
		});
}
