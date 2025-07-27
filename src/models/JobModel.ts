import { AppDataSource } from "../dataSource";
import { Job } from "../entities/job";
import { getUserById } from "./UserModel";
import { getPropertyById } from "./PropertyModel";

const jobRepository = AppDataSource.getRepository(Job);

async function addJob(userId: string, propertyId: string, date: Date): Promise<Job | null> {
    const newJob = new Job();
    newJob.user = await getUserById(userId);
    newJob.property = await getPropertyById(propertyId);
    newJob.date = date;

    await jobRepository.save(newJob);
    return newJob;
}

async function getJobsByUserId(userId: string): Promise <Job[] | null> {
    const jobs = jobRepository
                .createQueryBuilder('job')
                .where({user: {userId}})
                .leftJoin("job.user", "user")
                .leftJoin("job.property", "property")
                .select([
                    "job.jobId",
                    "job.date",
                    "job.totalPrice",
                    "property.propertyId",
                    "property.lawnSize",
                    "user.name"
                ])
                .getMany();
    return jobs;
}

async function getJobById(jobId: string): Promise <Job | null> {
    const job = await jobRepository.findOne({where: {jobId}});
    return job;
}

export { addJob, getJobsByUserId, getJobById }