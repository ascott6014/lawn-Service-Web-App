import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class JobService {
    @PrimaryGeneratedColumn('uuid')
    jobServiceID: string;

    @Column()
    jobID: string; // Foreign key

    @Column()
    serviceID: string; // Foreign key
}