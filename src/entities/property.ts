import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    propertyID: string;

    @Column()
    clientID: string; // foriegn key

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

}
