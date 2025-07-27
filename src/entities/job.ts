import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, OneToMany } from 'typeorm';
import { User } from './user';
import { JobService } from './jobService';
import { Property } from './property';


@Entity()
export class Job {
    @PrimaryGeneratedColumn('uuid')
    jobId: string;

    @Column()
    date: Date

    @Column({ default: 0.0})
    totalPrice: number;

    @ManyToOne(() => User, (user) => user.jobs)
    user: Relation<User>;

    @OneToMany(() => JobService, (jobService) => jobService.job)
    jobService: Relation<JobService>[];

    @ManyToOne(() => Property, (property) => property.jobs)
    property: Relation<Property>
    
}