import { Request, Response } from 'express';
import { getUsers, addUser, getUser, deleteUser, updateUser, loginUser } from '../services/user.service';
import { encryptPassword } from '../utils/encrypt';
import jwt from 'jsonwebtoken';

export async function registerUserController(req: Request, res: Response) {
    const tmp_password = await encryptPassword(req.body.password);
    const body = { ...req.body, password: tmp_password };

    addUser(body)
    .then(data => {

        const token = jwt.sign({
            _id: body.password,
        }, process.env.TOKEN_SECRET);

        return res.status(200).json({
            data,
            token
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};

export async function loginController(req: Request, res: Response) {
    
    loginUser(req.body.username, req.body.password)
    .then(resp => {

        const token = jwt.sign({
            _id: resp.id
        }, process.env.TOKEN_SECRET);

        res.json({
            data: resp,
            token: token
        });        
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
}

export async function getUsersController(req: Request, res: Response) {
	
	const filter = req.query.filter as string | undefined;

    getUsers(filter)
    .then(data => {
        return res.status(200).json({
            data
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};

export async function getUserController(req: Request, res: Response) {

    const { id } = req.params;

    getUser(parseInt(id))
    .then(data => {
        return res.status(200).json({
            data
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};

export async function updateUserController(req: Request, res: Response) {

    const body = req.body;
    const { id } = req.params;

	if (body.password) {
		const _newPassword = await encryptPassword(body.password);
		body.password = _newPassword;
	}

    updateUser(parseInt(id), body)
    .then(data => {
        return res.status(200).json({
            message: 'Usuario modificado',
            data
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};

export async function deleteUserController(req: Request, res: Response) {

    const { id } = req.params;

    deleteUser(parseInt(id))
    .then(() => {
        return res.status(200).json({
            message: 'Usuario eliminado'
        });
    })
    .catch(err => {
        return res.status(400).send({error: err.message});
    });
};
