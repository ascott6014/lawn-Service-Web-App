import { Request, Response } from "express";
import { parseDatabaseError } from "../utils/db-utils";
import { addJob, getJobsByUserId } from "../models/JobModel";
import { getUserById } from "../models/UserModel";

async function handleAddJob(req: Request, res: Response): Promise<void> {
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

    const { propertyId, date } = req.body as newJobParams;

    try {
        const job = await addJob(userId, propertyId, date);
        res.status(200).json(job);
    } catch (err) {
        console.log(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }
    
}

async function handleGetJobsByUserId(req: Request, res: Response): Promise<void> {
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
        const jobs = await getJobsByUserId(userId);
        res.status(200).json(jobs)
    } catch (err) {
        console.log(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }

}

export { handleAddJob, handleGetJobsByUserId };