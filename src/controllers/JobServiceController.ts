import { Request, Response } from "express";
import { parseDatabaseError } from "../utils/db-utils";
import { addJobService, getJobServicesByJobId } from "../models/jobServiceModel";
import { getUserById } from "../models/UserModel";
import { getJobById } from "../models/JobModel";
import { getServiceById } from "../models/ServiceModel";

async function handleAddJobService(req: Request, res: Response): Promise<void> {
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

    const { jobId, serviceId } = req.body as newJobServiceParams;

    const job = await getJobById(jobId);
    const service = await getServiceById(serviceId);

    if(!job){
        res.sendStatus(404); // job doesn't exist
        return;
    }

    if(!service){
        res.sendStatus(404); // service doesn't exist
        return;
    }

    try {
        const jobservice = await addJobService(jobId, serviceId);
        res.status(200).json(jobservice);
    } catch (err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }
}

async function handleGetJobServicesByJobId(req: Request, res: Response): Promise<void> {
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

    const {targetJobId} = req.params as targetJobIdParams;

    const job = getJobById(targetJobId);

    if(!job) {
        res.sendStatus(404); // job does not exist
        return;
    }
    
    try {
        const services = await getJobServicesByJobId(targetJobId);
        res.status(200).json(services)
    } catch (err) {
        console.error(err);
        const databaseErrorMessage = parseDatabaseError(err);
        res.status(500).json(databaseErrorMessage);
    }
}

export { handleAddJobService, handleGetJobServicesByJobId }