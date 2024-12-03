import Client from "../../domain/client.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import FindClientUsecase from "./find-client.usecase";

const client = new Client({
    id: new Id('1'),
    name: 'Client 1',
    email: 'x@x.com',
    address: 'Address 1',
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    }
};

describe('FindClientUsecase unit test', () => {
    it('should find a client', async () => {
        const repository = MockRepository();
        const usecase = new FindClientUsecase(repository);

        const input = { id: '1' };
        const output = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(output.id).toBe('1');
        expect(output.name).toBe('Client 1');
        expect(output.email).toBe('x@x.com');
        expect(output.address).toBe('Address 1');
    });
});