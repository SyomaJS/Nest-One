import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from '../../company/models/company.model';

interface BuilderAttr {
  full_name: string;
  birth_day: Date;
  salary: string;
  companyId: number;
}

@Table({ tableName: 'builder' })
export class Builder extends Model<Builder, BuilderAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  full_name: string;

  @Column({
    type: DataType.DATE,
  })
  birth_day: Date;

  @Column({
    type: DataType.STRING,
  })
  salary: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;
}
