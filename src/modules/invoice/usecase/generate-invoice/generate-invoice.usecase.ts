import InvoiceGateway from "../../gateway/invoice.gateway";
import {GenerateInvoiceInputDto, GenerateInvoiceOutputDto} from "./generate-invoice.usecase.dto";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/address.entity";
import InvoiceItems from "../../domain/invoice-items.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class GenerateInvoiceUsecase {
    constructor(private readonly invoiceGateway: InvoiceGateway) {
    }

    async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
        const invoice = new Invoice({
            id: new Id(input.id),
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode
            }),
            items: input.items.map(item => new InvoiceItems({
                name: item.name,
                price: item.price,
            })),
        });
        await this.invoiceGateway.add(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.items.length,
        };
    }
}