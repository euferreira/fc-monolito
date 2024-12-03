import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type OrderProps = {
    id?: Id;
    client: Client;
    products: Product[];
    status?: string;
}

export default class Order extends BaseEntity {
    readonly client: Client;
    readonly products: Product[];
    private _status: string;

    constructor(props: OrderProps) {
        super({id: props.id});
        this.client = props.client;
        this.products = props.products;
        this._status = props.status || 'pending';
    }

    get status(): string {
        return this._status;
    }

    approved(): void {
        this._status = 'approved';
    }

    get total(): number {
        return this.products.reduce((acc, product) => {
            return acc + product.salesPrice;
        }, 0);
    }
}