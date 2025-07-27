import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, OneToMany } from 'typeorm';
import { User } from './user';
import { JobService } from './jobService';


@Entity()
export class Job {
    @PrimaryGeneratedColumn('uuid')
    jobID: string;

    @Column()
    clientID: string; // Foriegn key

    @Column()
    date: Date

    @Column()
    status: string; // Enum

    @Column()
    totalPrice: number;

    @ManyToOne(() => User, (user) => user.jobs)
    user: Relation<User>;

    @OneToMany(() => JobService, (jobService) => jobService.job)
    jobService: Relation<JobService>[];
    
}