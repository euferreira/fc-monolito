import Id from "../../@shared/domain/value-object/id.value-object";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";

type TransactionProps = {
    id?: Id;
    amount: number;
    orderId: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderId: string;
    private _status: string;

    constructor(props: TransactionProps) {
        super({
            id: props.id,
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
        });

        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || 'pending';
        this.validate();
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }

        if (!this._orderId) {
            throw new Error('Order ID is required');
        }
    }

    approve(): void {
        this._status = 'approved';
    }

    decline(): void {
        this._status = 'declined';
    }

    process(): void {
        this._amount >= 100 ? this.approve() : this.decline();
    }

    get amount() {
        return this._amount;
    }

    get orderId() {
        return this._orderId;
    }

    get status() {
        return this._status;
    }
}