import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import {AddressModel, InvoiceItemsModel, InvoiceModel} from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Address from "../domain/address.entity";

export default class InvoiceRepository implements InvoiceGateway {
    async add(invoice: Invoice): Promise<void> {
        const address = await AddressModel.create({
            id: invoice.address.id.id,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
        });

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            addressId: address.id,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                invoiceId: invoice.id.id,
            })),
        }, {
            include: [InvoiceItemsModel]
        });
    }

    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findByPk(id, {
            include: [InvoiceItemsModel, AddressModel]
        });
        if (!invoice) {
            throw new Error('Invoice not found');
        }

        const items = invoice.items.map(item => new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
        }));

        const address = new Address({
            id: new Id(invoice.address.id),
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
        });

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: address,
            items: items,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }
}