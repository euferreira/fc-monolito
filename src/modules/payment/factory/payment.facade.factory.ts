import PaymentFacadeInterface from "../facade/facade.interface";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "../facade/payment.facade";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransactionRepository();
        const usecase = new ProcessPaymentUsecase(repository);

        return new PaymentFacade(usecase);
    }
}