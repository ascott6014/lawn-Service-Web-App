import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { Service } from './service';
import { Property } from './property';


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
    isContractor: boolean;

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

    @OneToMany(() => Service, (service) => service.user)
    services: Relation<Service>[];

    @OneToMany(() => Property, (property) => property.user)
    properties: Relation<Property>[];
}