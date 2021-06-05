import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RaspberryPi } from "./raspberry-pi";

@Index("FK_device_Light_Raspberry_Pi", ["piId"], {})
@Entity("device_Light", { schema: "Smart-Home" })
export class DeviceLight extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "light_id" })
  @ApiProperty({ example: '1' })
  lightId: string;

  @Column("bigint", { name: "pi_id" })
  @ApiProperty({ example: '1' })
  piId: string;

  @Column("varchar", { name: "name", length: 255 })
  @ApiProperty({ example: 'Light Name' })
  name: string;

  @Column("int", { name: "status" })
  @ApiProperty({ example: 1 })
  status: number | null;

  @Column("int", { name: "is_online" })
  @ApiProperty({ example: 1 })
  isOnline: number;

  @Column("int", { name: "switch_status" })
  @ApiProperty({ example: 1 })
  switchStatus: number;

  @Column("datetime", { name: "sw_last_update", nullable: true })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  swLastUpdate: Date | null;

  @Column("datetime", { name: "hw_last_update", nullable: true })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  hwLastUpdate: Date | null;

  @Column("varchar", { name: "position_x", nullable: true, length: 50 })
  @ApiProperty({ example: '1.000' })
  positionX: string | null;

  @Column("varchar", { name: "position_y", nullable: true, length: 50 })
  @ApiProperty({ example: '1.000' })
  positionY: string | null;

  @Column("varchar", { name: "otp", nullable: true, length: 50 })
  @ApiProperty({ example: '000000' })
  otp: string | null;

  @Column("int", { name: "activated" })
  @ApiProperty({ example: 1 })
  activated: number;

  @ManyToOne(() => RaspberryPi, (raspberryPi) => raspberryPi.deviceLights, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "pi_id", referencedColumnName: "piId" }])
  pi: RaspberryPi;
}
