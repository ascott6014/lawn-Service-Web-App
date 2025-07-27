import { Request, Response } from "express";
import { addUser, getUserByEmail, addService, getServicesByUserId, getUserById, addProperty } from "../models/UserModel";
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

async function handleAddService(req: Request, res: Response){
    const { name, description, price } = req.body as newServiceRequest;
    const { userId, isContractor, email} = req.session.authenticatedUser;

    const user = await getUserByEmail(email); // change to get user by id
    if (!user){ // if user doesn't exist
        res.sendStatus(404); // user not found
        return;
    }

    if(!isContractor){
        res.sendStatus(403); // user isn't contractor;
        return;
    }

    try {
        const newService = await addService(userId, name, description, parseFloat(price));
        console.log(newService);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }

}

async function handleGetServicesByUserId(req: Request, res: Response){
    // TODO FINISH I ADDED TYPE FOR REQ MAKE FUNCTION TO GET USER BY ID FOR VALIDATION
    const { userId } = req.body as targerUserParams;
    const user = await getUserById(userId);

    if(!user) {
        res.sendStatus(404); // user not found
        return
    }

    if(!user.isContractor) {
        res.sendStatus(403); // targer user is not contractor
        return;
    }
    
    try {
        const services = await getServicesByUserId(userId);
        res.status(200).json(services)
    } catch (err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }

    
}

async function handleAddPropery(req: Request, res: Response){
    const { userId } = req.session.authenticatedUser;
    const { isLoggedIn } = req.session;

    const user = getUserById(userId);
    if (!user){
        res.sendStatus(404); // user not found
        return;
    }

    if (!isLoggedIn) {
        res.sendStatus(401); // not logged  in
        return;
    }

    const { streetAddress, city, state, zip, lawnSize } = req.body as newPropertyParams;

    try {
        const newProperty = addProperty(userId, streetAddress, city, state, zip, parseFloat(lawnSize));
        res.status(200).json(newProperty)
    } catch (err) {
        console.log(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }
}

export { registerUser, login, handleAddService, handleGetServicesByUserId, handleAddPropery }