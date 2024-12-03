import Id from "../value-object/id.value-object";

type BaseEntityProps = {
    id?: Id;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class BaseEntity {
    private _id: Id;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor({id, createdAt, updatedAt}: BaseEntityProps) {
        this._id = id || new Id();
        this._createdAt = createdAt || new Date();
        this._updatedAt = updatedAt || new Date();
    }

    get id(): Id {
        return this._id;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(date: Date) {
        this._updatedAt = date;
    }
}