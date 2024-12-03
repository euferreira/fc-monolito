import Id from "../../@shared/domain/value-object/id.value-object";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
    private _name;
    private _email;
    private _address;

    constructor(props: ClientProps) {
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
        });
        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get address() {
        return this._address;
    }
}