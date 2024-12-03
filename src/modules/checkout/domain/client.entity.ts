import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
};

export default class Client extends BaseEntity implements AggregateRoot {
    readonly name: string;
    readonly email: string;
    readonly address: string;

    constructor(props: ClientProps) {
        super({
            id: props.id,
        });
        this.name = props.name;
        this.email = props.email;
        this.address = props.address;
    }
}