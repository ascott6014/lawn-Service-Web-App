import { AppDataSource } from "../dataSource";
import { User } from '../entities/user';

const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string): Promise<User> {
    // 1 create a new user object and set the properties
    const newUser = new User();
    newUser.email = email;
    newUser.passwordHash = passwordHash;

    // 2 Save it in the database
    await userRepository.save(newUser);

    // 3 Return the created user
    return newUser
}

async function getUserByEmail(email: string): Promise<User | null> {
    const user = await userRepository.findOne({ where: { email }});
    return user;
}

export { addUser, getUserByEmail }