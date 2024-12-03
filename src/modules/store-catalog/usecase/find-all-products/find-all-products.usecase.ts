import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import {FindAllProductsDto} from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface {
    constructor(private productRepository: ProductGateway) {
    }

    async execute(): Promise<FindAllProductsDto> {
        const result = await this.productRepository.findAll();
        return {
            products: result.map(product => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            })),
        };
    }
}