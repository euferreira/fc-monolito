import {Sequelize} from "sequelize-typescript";
import {AddressModel, InvoiceItemsModel, InvoiceModel} from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe('InvoiceFacade test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([AddressModel, InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a invoice', async () => {
        const facade = InvoiceFacadeFactory.create();

        const input = {
            id: "1",
            name: "Invoice 1",
            document: "123456789",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123456",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 123.45,
                },
            ],
        };
        await facade.add(input);

        const invoice = await InvoiceModel.findOne({
            where: {
                id: "1",
            },
            include: [AddressModel, InvoiceItemsModel],
        });

        expect(invoice).toBeDefined();
        expect(invoice.id).toBeDefined();
        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);
        expect(invoice.address.street).toBe(input.street);
        expect(invoice.address.number).toBe(input.number);
        expect(invoice.address.complement).toBe(input.complement);
        expect(invoice.address.city).toBe(input.city);
        expect(invoice.address.state).toBe(input.state);
        expect(invoice.address.zipCode).toBe(input.zipCode);
        expect(invoice.items).toBeDefined();
        expect(invoice.items).toHaveLength(1);
    });

    it('should find a invoice', async () => {
        const facade = InvoiceFacadeFactory.create();
        const input = {
            id: "1",
            name: "Invoice 1",
            document: "123456789",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123456",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 123.45,
                },
            ],
        };

        await facade.add(input);
        const invoice = await facade.find({
            id: "1",
        });

        expect(invoice).toBeDefined();
        expect(invoice.id).toBeDefined();
        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);
        expect(invoice.address.street).toBe(input.street);
        expect(invoice.address.number).toBe(input.number);
        expect(invoice.address.complement).toBe(input.complement);
        expect(invoice.address.city).toBe(input.city);
        expect(invoice.address.state).toBe(input.state);
        expect(invoice.address.zipCode).toBe(input.zipCode);
        expect(invoice.items).toBeDefined();
        expect(invoice.items).toHaveLength(1);
    });
});