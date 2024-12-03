import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemsProps = {
    id?: Id;
    name: string;
    price: number;
}

export default class InvoiceItems extends BaseEntity {
    private _name: string;
    private _price: number;

    constructor(props: InvoiceItemsProps) {
        super({
            id: props.id,
        });
        this._name = props.name;
        this._price = props.price;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }
}