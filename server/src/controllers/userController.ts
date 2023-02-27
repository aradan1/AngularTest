import {readDB, writeDB} from './utils'

type User = {
    name: string,
    password: string
}

const db = readDB();

// get all users
export function getAllUsers(): JSON{
    return db['users']
}

// get user by id
export function getUserById(id: string): User{
    return db['users'][id];
}

// create new user
export function createUser(newUser: User): User | null{
    if(db['users'][newUser.name]){
        return null;
    }
    db['users'][newUser.name] = newUser;
    writeDB(db);
    return newUser;
}

// edit user by id
export function editUserById(id: string, newUser: User): User{
    db['users'][id] = newUser;
    writeDB(db);
    return newUser;
}

// delete user by id
export function deleteUserById(id: string): void{
    delete db['users'][id];
    writeDB(db);
}

export function login(username: string, password: string): User | null{
    if(db['users'][username] && db['users'][username].password === password){
        return db['users'][username];
    }
    return null;
}