import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {ProcessPaymentInputDto, ProcessPaymentOutputDto} from "./process-payment.dto";
import PaymentGateway from "../../gateway/payment.gateway";
import Transaction from "../../domain/transaction";

export default class ProcessPaymentUsecase implements UseCaseInterface {
    constructor(private readonly transactionRepository: PaymentGateway) {
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId,
        });

        transaction.process();

        const persistTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: transaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        }
    }
}