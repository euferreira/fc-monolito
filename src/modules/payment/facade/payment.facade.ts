import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    constructor(private readonly processPaymentUseCase: UseCaseInterface) {
    }

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this.processPaymentUseCase.execute(input);
    }
}