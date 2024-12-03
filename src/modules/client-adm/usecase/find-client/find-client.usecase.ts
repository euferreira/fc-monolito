import ClientGateway from "../../gateway/client.gateway";
import {FindClientInputDto, FindClientOutputDto} from "./find-client.usecase.dto";

export default class FindClientUsecase {
    constructor(private readonly clientGateway: ClientGateway) {}

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const result = await this.clientGateway.find(input.id);

        if (!result) {
            throw new Error('Client not found');
        }

        return {
            id: result.id.id,
            name: result.name,
            email: result.email,
            address: result.address,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        };
    }
}