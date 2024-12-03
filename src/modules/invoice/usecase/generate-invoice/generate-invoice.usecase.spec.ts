import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
};

describe('GenerateInvoiceUnitTest', () => {
    it('should add a invoice', async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(repository);

        const input = {
            id: '1',
            name: 'Invoice 1',
            document: 'Document 1',
            street: 'Street 1',
            number: '1',
            complement: 'Complement 1',
            city: 'City 1',
            state: 'State 1',
            zipCode: 'ZipCode 1',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    price: 10
                }
            ],
        };
        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBeDefined();
        expect(result.document).toBeDefined();
        expect(result.street).toBeDefined();
        expect(result.number).toBeDefined();
        expect(result.complement).toBeDefined();
        expect(result.city).toBeDefined();
        expect(result.state).toBeDefined();
        expect(result.zipCode).toBeDefined();
        expect(result.items).toBeDefined();
        expect(result.total).toBeDefined();
    });
});