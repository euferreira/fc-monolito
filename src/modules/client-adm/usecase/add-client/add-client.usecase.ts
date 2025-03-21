import ClientGateway from "../../gateway/client.gateway";
import {AddClientInputDto, AddClientOutputDto} from "./add-client.usecase.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";

export default class AddClientUseCase {
    constructor(private readonly clientGateway: ClientGateway) {}

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            email: input.email,
            address: input.address,
        };

        const client = new Client(props);
        await this.clientGateway.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}