import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import CheckStockUsecase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUsecase(productRepository);
        const checkStockUseCase = new CheckStockUsecase(productRepository);

        return new ProductAdmFacade({
            addUsecase: addProductUseCase,
            stockUsecase: checkStockUseCase,
        });
    }
}