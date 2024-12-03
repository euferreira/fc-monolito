import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import CheckStockUsecase from "./check-stock.usecase";

const product = new Product({
    id: new Id('1'),
    name: 'Product 1',
    description: 'Description 1',
    purchasePrice: 10,
    stock: 10,
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
};

describe('CheckStockUsecase unit test', () => {
    it('should get stock of a product', async () => {
        const ProductRepository = MockRepository();
        const checkStockUsecase = new CheckStockUsecase(ProductRepository);

        const input = { productId: '1' };
        const output = await checkStockUsecase.execute(input);

        expect(ProductRepository.find).toHaveBeenCalled();
        expect(output.productId).toBe('1');
        expect(output.stock).toBe(10);
    });
});