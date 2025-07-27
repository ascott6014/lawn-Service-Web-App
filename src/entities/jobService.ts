import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { Job } from './job';
import { Service } from './service';

@Entity()
export class JobService {
    @PrimaryGeneratedColumn('uuid')
    jobServiceID: string;

    @Column()
    status: string; // Enum

    // @Column()
    // jobID: string; // Foreign key

    // @Column()
    // serviceID: string; // Foreign key

    @ManyToOne(() => Job, (job) => job.jobService)
    job: Relation<Job>;

    @ManyToOne(() => Service, (service) => service.jobService)
    service: Relation<Service>;
}