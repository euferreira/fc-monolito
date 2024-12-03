import {BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
    tableName: 'invoice_items',
    timestamps: true,
})
export class InvoiceItemsModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @ForeignKey(() => InvoiceModel)
    @Column({allowNull: false})
    invoiceId: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    price: number;
}

@Table({
    tableName: 'address',
    timestamps: true,
})
export class AddressModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    street: string;

    @Column({allowNull: false})
    number: string;

    @Column({allowNull: false})
    complement: string;

    @Column({allowNull: false})
    city: string;

    @Column({allowNull: false})
    state: string;

    @Column({allowNull: false})
    zipCode: string;
}

@Table({
    tableName: 'invoices',
    timestamps: true,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    document: string;

    @ForeignKey(() => AddressModel)
    @Column({allowNull: false})
    addressId: string;

    @BelongsTo(() => AddressModel)
    address: AddressModel;

    @Column({allowNull: false})
    createdAt: Date;

    @Column({allowNull: false})
    updatedAt: Date;

    @HasMany(() => InvoiceItemsModel)
    items: InvoiceItemsModel[];
}