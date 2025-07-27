import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, OneToMany } from 'typeorm'
import { User } from './user';
import { JobService } from './jobService';

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    serviceId: string;

    // @Column()
    // userId: string; // Foreign key

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @ManyToOne(() => User, (user) => user.services)
    user: Relation<User>;

    @OneToMany(() => JobService, (jobService) => jobService.service)
    jobService: Relation<JobService>[];
}