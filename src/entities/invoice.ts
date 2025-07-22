import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Invoice{
    @PrimaryGeneratedColumn('uuid')
    invoiceID: string;

    @Column()
    clientID: string; // foreign key

    @Column()
    jobID: string; // foreign key

    @Column()
    subtotal: number;

    @Column()
    taxRate: number;

    @Column()
    totalAmount: number;
}