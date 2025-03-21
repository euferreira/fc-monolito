import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import {ClientModel} from "./client.model";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class ClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }

    async find(id: string): Promise<Client> {
        const client = await ClientModel.findByPk(id);
        if (!client) {
            throw new Error('Client not found');
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }
}