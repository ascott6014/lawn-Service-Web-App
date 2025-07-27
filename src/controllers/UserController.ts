import { Request, Response } from "express";
import { addUser, getUserByEmail, getUserById} from "../models/UserModel";
import { parseDatabaseError } from "../utils/db-utils";
import argon2 from 'argon2';

async function registerUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as NewUserRequest;

    // Hash the user's password
    const passwordHash = await argon2.hash(password);

    try {
        // Store the hash instead of their actual password
        const newUser = await addUser (email, passwordHash);
        console.log(newUser);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }
}

async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as NewUserRequest;
    const user = await getUserByEmail(email);

    if (!user) {
        res.sendStatus(403); // forbidden email doesn't exit
        return;
    }

    const { passwordHash } = user;

    if (!(await argon2.verify(passwordHash, password))){
        if (!req.session.logInAttempts){
            req.session.logInAttempts = 1; // first attempt
        } else {
            req.session.logInAttempts += 1; // increment theri attempts
        }
        res.sendStatus(403); // Forbidden - invalid password
        return;
    }

    await req.session.clearSession();
    req.session.authenticatedUser = {
        userId: user.userId,
        email: user.email,
        isContractor: user.isContractor
    };
    req.session.isLoggedIn = true;
    res.sendStatus(200);
}


export { registerUser, login }