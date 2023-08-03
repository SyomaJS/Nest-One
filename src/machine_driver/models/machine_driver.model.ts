import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Driver } from '../../driver/models/driver.model';
import { Machine } from '../../machine/models/machine.model';

interface Machine_driverAttr {
  machineId: number;
  driverId: number;
}

@Table({ tableName: 'machine_driver' })
export class Machine_driver extends Model<Machine_driver, Machine_driverAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Machine)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  machineId: number;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  driverId: number;

  @BelongsTo(() => Machine)
  machine: Machine;

  @BelongsTo(() => Driver)
  driver: Driver;
}
