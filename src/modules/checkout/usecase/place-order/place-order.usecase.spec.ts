import PlaceOrderUsecase from "./place-order.usecase";
import {PlaceOrderInputDto} from "./place-order.dto";
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

const mockDate = new Date('2021-01-01T00:00:00Z');

describe('PlaceorderUsecase test', () => {
    describe('validateProducts method', () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUsecase();

        it('should throw error if no products are selected', async () => {
            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: [],
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error('No products selected'));
        });

        it('should throw an error when products is out of stock', async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: { productId: string }) => Promise.resolve({
                    productId,
                    stock: 0,
                })),
            };

            //@ts-expect-error - force set product facade
            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [
                    {productId: "1"},
                ],
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error('Product 1 is not available in stock'));

            input = {
                clientId: "0",
                products: [
                    {productId: "0"},
                    {productId: "1"},
                ],
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error('Product 0 is not available in stock'));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);

            input = {
                clientId: "0",
                products: [
                    {productId: "0"},
                    {productId: "1"},
                    {productId: "2"},
                ],
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error('Product 0 is not available in stock'));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
        });
    });

    describe('getProducts method', () => {
        beforeAll(() => {
            jest.useFakeTimers({
                timerLimit: 10000,
            });
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUsecase();

        it('should throw an error when product not found', async () => {
            //@ts-expect-error - force set catalog facade
            placeOrderUseCase["_catalogFacade"] = {
                find: jest.fn().mockResolvedValue(Promise.resolve(null)),
            };

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(new Error('Product 0 not found'));
        });

        it('should return a product', async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(Promise.resolve({
                    id: "1",
                    name: "product",
                    description: "description",
                    salesPrice: 100,
                })),
            };

            //@ts-expect-error - force set catalog facade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("1")).resolves.toEqual(
                new Product({
                    id: new Id("1"),
                    name: "product",
                    description: "description",
                    salesPrice: 100,
                }),
            );
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('execute method', () => {
        beforeAll(() => {
            jest.useFakeTimers({
                timerLimit: 10000,
            });
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it('should throw an error when client not found', async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            };

            //@ts-ignore - no params in constructor
            const placeOrderUseCase = new PlaceOrderUsecase();
            //@ts-expect-error - force set client facade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: [],
            };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('Client not found'));
        });

        it('should throw an error when products are not valid', async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            };

            //@ts-ignore - no params in constructor
            const placeOrderUseCase = new PlaceOrderUsecase();

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error('No products selected'));

            //@ts-expect-error - force set client facade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: [],
            };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('No products selected'));
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        });

        describe('place an order', () => {
            const clientProps = {
                id: "1c",
                name: "client 0",
                document: "0000",
                email: "email@email.com",
                street: "street",
                number: "1",
                complement: "",
                city: "some city",
                state: "some state",
                zipCode: "000"
            };

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(Promise.resolve(clientProps)),
            };

            const mockPaymentFacade = {
                process: jest.fn(),
            };

            const mockCheckoutRepository = {
                addOrder: jest.fn()
            };

            const mockInvoiceFacade = {
                add: jest.fn().mockResolvedValue({id: "1i"}),
            };

            const placeOrderUsecase = new PlaceOrderUsecase(
                mockClientFacade as any,
                null,
                null,
                mockCheckoutRepository as any,
                mockInvoiceFacade as any,
                mockPaymentFacade as any,
            );

            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "Description 1",
                    salesPrice: 40,
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    description: "Description 2",
                    salesPrice: 60,
                }),
            };

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUsecase, "validateProducts")
                //@ts-expect-error - not return never
                .mockResolvedValue(null);

            const mockGetProduct = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUsecase, "getProduct")
                //@ts-expect-error - not return never
                .mockImplementation((productId: keyof typeof products) => Promise.resolve(products[productId]));

            it('should not be approved', async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue(Promise.resolve({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "error",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }));

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [
                        {productId: "1"},
                        {productId: "2"},
                    ],
                };

                let output = await placeOrderUsecase.execute(input);

                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    {productId: "1"},
                    {productId: "2"},
                ]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"});
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total,
                });
                expect(mockInvoiceFacade.add).toHaveBeenCalledTimes(0);
            });
        });
    });
});