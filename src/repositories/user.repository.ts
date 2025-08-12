import { User } from '../models/user';

export async function getAll(filter?: string) {
	filter = filter ? filter.toLowerCase() : '';

    return User.find({
        select: [
            'id',
            'name',
            'lastName',
            'username',
        ]
    });
}

export async function getOne(id: number) {
    return User.findOne({
        select: [
            'id',
            'name',
            'lastName',
            'username',
        ],
        where: [
            { id }
        ],
    });
}

export async function remove(id: number) {
    return User.delete({
        id
    });
}

export async function add(user: User) {

    return User.save({
        ...user
    });
}

export async function update(id: number, user: User) {

    return User.save({
        id,
        ...user
    });
}

export async function login(username: string) {
    
    return User.findOne({
        select: [
            'id',
            'name',
            'lastName',
            'username',
			'password'
        ],
        where: [
            { username }
        ]
    });
}

export async function user_exists(username: string) {
    
    return User.findOne({
        where: [
            { username }
        ]
    });
}