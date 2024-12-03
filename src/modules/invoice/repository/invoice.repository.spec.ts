import {Sequelize} from "sequelize-typescript";
import {AddressModel, InvoiceItemsModel, InvoiceModel} from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.entity";
import InvoiceItems from "../domain/invoice-items.entity";

describe('InvoiceRepository unit test', () => {
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

    it('should find a invoice', async () => {
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
        const inputAddress = {
            id: input.id,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
        };

        const address = await AddressModel.create(inputAddress);

        const invoice = await InvoiceModel.create({
            id: input.id,
            name: input.name,
            document: input.document,
            addressId: address.id,
            items: input.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
            include: [InvoiceItemsModel, AddressModel],
        });

        const repository = new InvoiceRepository();
        const result = await repository.find(invoice.id);

        expect(result.id.id).toBe(invoice.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address).toBeDefined();
        expect(result.items).toBeDefined();
    });

    it('should create a invoice', async () => {
        const invoice = new Invoice({
            id: new Id('1'),
            name: 'Invoice 1',
            document: '123456789',
            address: new Address({
                street: 'Street 1',
                number: '123',
                complement: 'Complement 1',
                city: 'City 1',
                state: 'State 1',
                zipCode: '123456',
            }),
            items: [],
        });

        const repository = new InvoiceRepository();
        await repository.add(invoice);

        const invoiceDb = await InvoiceModel.findByPk(invoice.id.id, {
            include: [InvoiceItemsModel, AddressModel],
        });

        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.id).toBe(invoice.id.id);
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.address).toBeDefined();
    });
});