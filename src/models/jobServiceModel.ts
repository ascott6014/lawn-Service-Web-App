import { AppDataSource } from "../dataSource";
import { JobService } from "../entities/jobService";
import { getJobById } from "./JobModel";
import { getServiceById } from "./ServiceModel";

const jobServiceRepository = await AppDataSource.getRepository(JobService);

async function addJobService(jobId: string, serviceId: string): Promise <JobService | null> {
    const newJobService = new JobService();
    const job = await getJobById(jobId);
    const service = await getServiceById(serviceId);
    newJobService.job = job;
    job.totalPrice += service.price; // update total price of job
    newJobService.service = service;

    await jobServiceRepository.save(newJobService);
    return newJobService;
}

export { addJobService }