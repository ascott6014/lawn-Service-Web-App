import { AppDataSource } from "../dataSource";
import { User } from '../entities/user';
import { Service } from '../entities/service';
import { Property } from "../entities/property";

const userRepository = AppDataSource.getRepository(User);
const serviceRepository = AppDataSource.getRepository(Service);
const propertyRepository = AppDataSource.getRepository(Property);

async function addUser(email: string, passwordHash: string): Promise<User> {
    // 1 create a new user object and set the properties
    const newUser = new User();
    newUser.email = email;
    newUser.passwordHash = passwordHash;

    // 2 Save it in the database
    await userRepository.save(newUser);

    // 3 Return the created user
    return newUser
}

async function getUserByEmail(email: string): Promise<User | null> {
    const user = await userRepository.findOne({ where: { email }});
    return user;
}

async function getUserById(userId: string): Promise<User | null> {
    const user = await userRepository.findOne({where: {userId}});
    return user;
}

async function addService(userId: string, name: string, description: string, price: number): Promise<Service | null>{
    const newService = new Service();
    newService.user = await getUserById(userId);
    newService.name = name;
    newService.description = description;
    newService.price = price;
    
    await serviceRepository.save(newService);

    return newService;
}

async function getServicesByUserId(userId: string): Promise <Service[] | null> {
    const services = await serviceRepository
                .createQueryBuilder('service')
                .where({user: {userId}})
                .leftJoin("service.user", "user")
                .select([
                    "service.serviceId",
                    "service.userId",
                    "service.name",
                    "service.description",
                    "service.price",
                    "user.name",
                    "user.email",
                    "user.phone"
                ])
                .getMany();
    return services;
}

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

export { addUser, getUserByEmail, addService ,getServicesByUserId, getUserById, addProperty }