import { AppDataSource } from "../dataSource";
import { Property } from "../entities/property";
import { getUserById } from "./UserModel";

const propertyRepository = AppDataSource.getRepository(Property);

async function addProperty(userId: string, streetAddress: string, city: string, state: string, zip: string, lawnSize: number): Promise <Property | null> {
    const newProperty = new Property();
    newProperty.user = await getUserById(userId);
    newProperty.streetAddress = streetAddress;
    newProperty.city = city;
    newProperty.state = state;
    newProperty.lawnSize = lawnSize;

    await propertyRepository.save(newProperty);
    return newProperty;
}

async function getPropertiesByUserId(userId: string): Promise<Property[] | null> {
    const properties = await propertyRepository
                    .createQueryBuilder('property')
                    .where({user: {userId}})
                    .leftJoin("property.user", "user")
                    .select([
                        "property.propertyId",
                        "property.streetAddress",
                        "property.city",
                        "property.state",
                        "property.zip",
                        "property.lawnSize",
                        "user.name",
                        "user.email",
                        "user.phone"
                    ])
                    .getMany();
    return properties;
}

async function getPropertyById(propertyId: string): Promise<Property | null> {
    const property = await propertyRepository.findOne({where: {propertyId}});
    return property;
}

export { addProperty, getPropertiesByUserId, getPropertyById }