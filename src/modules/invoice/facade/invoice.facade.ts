import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    addUsecase: UseCaseInterface;
    findUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _addUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._addUsecase = usecaseProps.addUsecase;
        this._findUsecase = usecaseProps.findUsecase;
    }

    async add(input: GenerateInvoiceFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input);
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }
}