import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


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
}