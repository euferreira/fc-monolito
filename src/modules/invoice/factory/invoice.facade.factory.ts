import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacade {
        const invoiceRepository = new InvoiceRepository();
        const findUseCase = new FindInvoiceUsecase(invoiceRepository);
        const generateUseCase = new GenerateInvoiceUsecase(invoiceRepository);

        return new InvoiceFacade({
            addUsecase: generateUseCase,
            findUsecase: findUseCase,
        });
    }
}