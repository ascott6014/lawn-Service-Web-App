import {addService, getServicesByUserId} from "../models/ServiceModel";
import { Request, Response } from "express";
import { parseDatabaseError } from "../utils/db-utils";
import { getUserById } from "../models/UserModel";

async function handleAddService(req: Request, res: Response): Promise<void> {
    const { name, description, price } = req.body as newServiceRequest;
    const { userId, isContractor, email} = req.session.authenticatedUser;

    const user = await getUserById(email); // change to get user by id
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

async function handleGetServicesByUserId(req: Request, res: Response): Promise<void> {
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

export { handleAddService, handleGetServicesByUserId }