import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Relation } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true})
    passwordHash: string;

    @Column()
    contractor: boolean;

    @Column({ unique: true })
    phone: string;

    @Column()
    streetAddress: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zip: string;
}