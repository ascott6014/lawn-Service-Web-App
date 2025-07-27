import { Request, Response } from "express";
import { addProperty, getPropertiesByUserId } from "../models/PropertyModel";
import { parseDatabaseError } from "../utils/db-utils";
import { getUserById } from "../models/UserModel";

async function handleAddPropery(req: Request, res: Response): Promise<void> {
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

async function handleGetPropertiesByUserId(req: Request, res: Response): Promise<void> {
    const {userId} = req.session.authenticatedUser;
    const {isLoggedIn} = req.session;

    const user = getUserById(userId);
    if (!user){
        res.sendStatus(404); // user not found
        return;
    }

    if (!isLoggedIn) {
        res.sendStatus(401); // not logged  in
        return;
    }

    try {
        const properties = await getPropertiesByUserId(userId);
        res.send(200).json(properties);
    } catch (err) {
        console.log(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }


}

export { handleAddPropery, handleGetPropertiesByUserId }