import { Request, Response } from 'express';
import { getCategory, createCategory, getCategories, deleteCategory, updateCategory } from '../services/category.service';

export async function createCategoryController(req: Request, res: Response) {
	const body = req.body;
	
    createCategory(body)
    .then(data => {
        return res.status(200).json({
            data
        })
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};


export async function getCategoriesController(req: Request, res: Response) {
	const filter = req.query.filter as string | undefined;
	const page = req.query.page as string | undefined;
	const pageSize = req.query.pageSize as string | undefined;

    getCategories(filter, parseInt(page), parseInt(pageSize))
    .then(resp => {
		const { data, maxPages, totalItems } = resp;

		return res.status(200).json({
			data,
			maxPages,
			totalItems,
		});
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};

export async function getCategoryController(req: Request, res: Response) {
    const { id } = req.params;

    getCategory(parseInt(id))
    .then(data => {
        return res.status(200).json({
            data
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};

export async function updateCategoryController(req: Request, res: Response) {
    const body = req.body;
    const { id } = req.params;

    updateCategory(parseInt(id), body)
    .then(data => {
        return res.status(200).json({
            message: 'Categoría modificada',
            data
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};

export async function deleteCategoryController(req: Request, res: Response) {
    const { id } = req.params;

    deleteCategory(parseInt(id))
    .then(() => {
        
        return res.status(200).json({
            message: 'Categoría eliminada'
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};
