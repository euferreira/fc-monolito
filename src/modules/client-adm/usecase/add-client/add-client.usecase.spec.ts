import {AddClientInputDto} from "./add-client.usecase.dto";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
};

describe('AddClientUsecase unit test', () => {
    it('should add a client', async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);

        const input = {
            name: 'Client 1',
            email: 'x@x.com',
            address: 'Address 1',
        } satisfies AddClientInputDto;

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
    });
});