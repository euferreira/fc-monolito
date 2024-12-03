import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto
} from "./product-adm.facade.interface";

export interface UseCaseProps {
    addUsecase: UseCaseInterface;
    stockUsecase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUsecase: UseCaseInterface;
    private _stockUsecase: UseCaseInterface;

    constructor({ addUsecase, stockUsecase }: UseCaseProps) {
        this._addUsecase = addUsecase;
        this._stockUsecase = stockUsecase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._stockUsecase.execute(input);
    }
}