import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation, OneToMany } from "typeorm";
import { User } from "./user";
import { Job } from "./job";

@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    propertyId: string;

    // @Column()
    // userId: string; // foriegn key

    @Column()
    streetAddress: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zip: string;

    @Column()
    lawnSize: number;

    @ManyToOne(() => User, (user) => user.properties)
    user: Relation<User>;

    @OneToMany(() => Job, (job) => job.property)
    jobs: Relation<Job>[];
}
