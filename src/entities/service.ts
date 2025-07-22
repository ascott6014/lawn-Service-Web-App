import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    serviceID: string;

    @Column()
    contractorID: string; // Foreign key

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;
}