import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceLight } from "./device-light";
import { DeviceDht } from "./device-dht";
import { User } from "./user";
import { ApiProperty } from "@nestjs/swagger";

@Index("FK_Raspberry_Pi_User", ["userId"], {})
@Entity("Raspberry_Pi", { schema: "Smart-Home" })
export class RaspberryPi extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "Pi_ID" })
  @ApiProperty({ example: '1' })
  piId: string;

  @Column("varchar", { name: "name", length: 128 })
  @ApiProperty({ example: 'PI_name' })
  name: string;

  @Column("datetime", { name: "create_time" })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  createTime: Date;

  @Column("int", { name: "status" })
  @ApiProperty({ example: 1 })
  status: number;

  @Column("datetime", { name: "update_time", nullable: true })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  updateTime: Date | null;

  @Column("int", { name: "user_id" })
  @ApiProperty({ example: '2' })
  userId: string;

  @Column("varchar", { name: "position_x", nullable: true, length: 50 })
  @ApiProperty({ example: '2' })
  positionX: string | null;

  @Column("varchar", { name: "position_y", nullable: true, length: 50 })
  @ApiProperty({ example: '2' })
  positionY: string | null;

  @Column("varchar", { name: "otp", nullable: true, length: 50 })
  @ApiProperty({ example: '111000' })
  otp: string | null;

  @OneToMany(() => DeviceLight, (deviceLight) => deviceLight.pi)
  deviceLights: DeviceLight[];

  @OneToMany(() => DeviceDht, (deviceDht) => deviceDht.pi)
  deviceDhts: DeviceDht[];

  @ManyToOne(() => User, (user) => user.raspberryPis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
