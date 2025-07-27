import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm";
import { User } from "./user";

@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    propertyID: string;

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
}
