import AddProductUsecase from "./add-product.usecase";
import {AddProductInputDto} from "./add-product.dto";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("AddProductUsecase unit test", () => {
    it("should add a product", async () => {
        const repository = MockRepository();
        const usecase = new AddProductUsecase(repository);

        const input = {
            name: "product",
            description: "description",
            purchasePrice: 10,
            stock: 10,
        } satisfies AddProductInputDto;

        const result = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.description).toBe(input.description);
        expect(result.purchasePrice).toBe(input.purchasePrice);
        expect(result.stock).toBe(input.stock);
    });
});