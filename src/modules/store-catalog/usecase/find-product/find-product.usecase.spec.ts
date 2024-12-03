import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import FindProductUsecase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product Name",
    description: "Product Description",
    salesPrice: 100,
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockResolvedValue(product),
    }
};

describe('find a product usecase unit test', () => {
    it('should find a product', async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);

        const input = { id: "1" };
        const output = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output).toEqual({
            id: "1",
            name: "Product Name",
            description: "Product Description",
            salesPrice: 100,
        });
    });
});