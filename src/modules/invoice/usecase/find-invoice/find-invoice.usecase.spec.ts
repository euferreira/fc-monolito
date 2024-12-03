import Invoice from "../../domain/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.entity";
import FindInvoiceUsecase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id('1'),
    name: 'Invoice 1',
    document: 'Document 1',
    address: new Address({
        street: 'Street 1',
        number: '1',
        complement: 'Complement 1',
        city: 'City 1',
        state: 'State 1',
        zipCode: 'ZipCode 1',
    }),
    items: [],
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
};

describe('FindInvoiceUseCase unit test', () => {
    it('should find a invoice', async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUsecase(repository);

        const input = { id: '1' };
        const output = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(output.id).toBe('1');
        expect(output.name).toBe('Invoice 1');
        expect(output.document).toBe('Document 1');
        expect(output.address.street).toBe('Street 1');
        expect(output.address.number).toBe('1');
        expect(output.address.complement).toBe('Complement 1');
        expect(output.address.city).toBe('City 1');
        expect(output.address.state).toBe('State 1');
        expect(output.address.zipCode).toBe('ZipCode 1');
        expect(output.items).toEqual([]);
    });
});