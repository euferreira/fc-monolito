import {Sequelize} from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe('product repository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find-product all products', async () => {
        for (let i in [1,2]) {
            await ProductModel.create({
                id: `${i}`,
                name: `Product ${i}`,
                description: `Description ${i}`,
                salesPrice: (Number(i) + 1) * 100,
            });
        }

        const productsRepository = new ProductRepository();
        const products = await productsRepository.findAll();

        expect(products).toHaveLength(2);
        expect(products[0].id.id).toBe('0');
        expect(products[0].name).toBe('Product 0');
        expect(products[0].description).toBe('Description 0');
        expect(products[0].salesPrice).toBe(100);

        expect(products[1].id.id).toBe('1');
        expect(products[1].name).toBe('Product 1');
        expect(products[1].description).toBe('Description 1');
        expect(products[1].salesPrice).toBe(200);
    });

    it('should find a product', async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            salesPrice: 100,
        });

        const productsRepository = new ProductRepository();
        const product = await productsRepository.find('1');

        expect(product.id.id).toBe('1');
        expect(product.name).toBe('Product 1');
        expect(product.description).toBe('Description 1');
        expect(product.salesPrice).toBe(100);
    });
});