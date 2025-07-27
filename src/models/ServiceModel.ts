import { AppDataSource } from "../dataSource";
import { Service } from '../entities/service';
import { getUserById } from "./UserModel";

const serviceRepository = AppDataSource.getRepository(Service);

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

export { addService ,getServicesByUserId }