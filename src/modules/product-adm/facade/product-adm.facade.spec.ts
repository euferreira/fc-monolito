import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe('ProductAdmFacade', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should add a product', async () => {
        const productFacade = ProductAdmFacadeFactory.create();
        const input = {
            id: '1',
            name: 'Product 1',
            description: 'Description',
            purchasePrice: 10,
            stock: 10,
        };

        await productFacade.addProduct(input);
        const product = await ProductModel.findOne({where: {id: input.id}});

        expect(product).toBeDefined();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
    });

    it('should check a product stock', async () => {
        const productFacade = ProductAdmFacadeFactory.create();
        const input = {
            id: '1',
            name: 'Product 1',
            description: 'Description',
            purchasePrice: 10,
            stock: 10,
        };

        await productFacade.addProduct(input);
        const result = await productFacade.checkStock({productId: input.id});
        expect(result.productId).toBe(input.id);
        expect(result.stock).toBe(input.stock);
    });
});