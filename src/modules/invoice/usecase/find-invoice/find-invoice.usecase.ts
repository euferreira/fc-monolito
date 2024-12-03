import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceInputDto, FindInvoiceOutputDTO} from "./find-invoice.usecase.dto";

export default class FindInvoiceUsecase {
    constructor(private readonly invoiceGateway: InvoiceGateway) {}

    async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDTO> {
        const result = await this.invoiceGateway.find(input.id);

        if (!result) {
            throw new Error('Invoice not found');
        }

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: result.address,
            items: result.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            createdAt: result.createdAt,
            total: result.items.length,
        };
    }
}