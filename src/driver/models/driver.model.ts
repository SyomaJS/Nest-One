import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Machine } from '../../machine/models/machine.model';
import { Machine_driver } from '../../machine_driver/models/machine_driver.model';

interface DriverAttr {
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'driver' })
export class Driver extends Model<Driver, DriverAttr> {
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
  first_name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  last_name: string;

  //   @HasMany(() => Machine_driver)
  //   machine_drivers: Machine_driver[];

  @BelongsToMany(() => Machine, () => Machine_driver)
  machines: Machine[];
}
