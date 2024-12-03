import Id from "../../@shared/domain/value-object/id.value-object";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type ProductProps = {
    id?: Id;
    name: string;
    description: string;
    salesPrice: number;
};

export default class Product extends BaseEntity implements AggregateRoot {
    readonly name: string;
    readonly description: string;
    readonly salesPrice: number;

    constructor(props: ProductProps) {
        super({
            id: props.id,
        });
        this.name = props.name;
        this.description = props.description;
        this.salesPrice = props.salesPrice;
    }
}