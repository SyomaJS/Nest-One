import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Builder } from '../../builder/models/builder.model';
import { Machine } from '../../machine/models/machine.model';

interface CompanyAttr {
  name: string;
  address: string;
  phone: string;
}

@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @HasMany(() => Builder)
  builders: Builder[];

  @HasMany(() => Machine)
  machines: Machine[];
}
