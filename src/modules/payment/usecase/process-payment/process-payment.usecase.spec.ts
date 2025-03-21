import Transaction from "../../domain/transaction";
import Id from "../../../@shared/domain/value-object/id.value-object";
import ProcessPaymentUsecase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
};


describe('process payment unit test', () => {
    it('should approve a transaction', async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUsecase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 100,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });

    it('should decline a transaction', async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentUsecase(paymentRepository);

        const input = {
            orderId: "1",
            amount: 50,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });
});