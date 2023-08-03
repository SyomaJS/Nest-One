import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Company } from '../../company/models/company.model';
import { Driver } from '../../driver/models/driver.model';
import { Machine_driver } from '../../machine_driver/models/machine_driver.model';

interface MachineAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, MachineAttr> {
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
  name: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  //   @HasMany(() => Machine_driver)
  //   machine_drivers: Machine_driver[];

  @BelongsToMany(() => Driver, () => Machine_driver)
  drivers: Driver[];
}
