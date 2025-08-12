import { validatePassword } from '../utils/encrypt';
import { getAll, add, getOne, update, remove, login } from '../repositories/user.repository';
import { User } from '../models/user';

export async function getUsers(filter?: string) {
    return getAll(filter);
}

export async function getUser(id: number) {
    return getOne(id);
}

export async function addUser(user: User) {
    return add(user);
}

export async function updateUser(id: number, user: User) {
    return update(id, user);
}

export async function deleteUser(id: number) {

    const user_exists = await getOne(id);

    if (!user_exists) throw new Error( 'user not found' );

    return remove(id);
}

export async function loginUser(username: string, password: string) {
    const response = await login(username);

    if (!response) throw new Error('User not found');

    const isValid = await validatePassword(password, response.password);

    if (isValid) {
        delete response.password;
        return response;
    } else {
        throw new Error('Invalid password');
    }
}