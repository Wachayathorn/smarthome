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

@Index("FK__Raspberry_Pi", ["piId"], {})
@Entity("device_DHT", { schema: "Smart-Home" })
export class DeviceDht extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "dht_id" })
  @ApiProperty({ example: '1' })
  dhtId: string;

  @Column("varchar", { name: "name", length: 255 })
  @ApiProperty({ example: 'DHT Name' })
  name: string;

  @Column("int", { name: "status"})
  @ApiProperty({ example: 1 })
  status: number | null;

  @Column("int", { name: "is_online" })
  @ApiProperty({ example: 1 })
  isOnline: number;

  @Column("varchar", { name: "temperature", nullable: true, length: 10 })
  @ApiProperty({ example: '36.0' })
  temperature: string | null;

  @Column("varchar", { name: "moisture", nullable: true, length: 10 })
  @ApiProperty({ example: '20.0' })
  moisture: string | null;

  @Column("datetime", { name: "sw_last_update", nullable: true })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  swLastUpdate: Date | null;

  @Column("datetime", { name: "hw_last_update", nullable: true })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  hwLastUpdate: Date | null;

  @Column("bigint", { name: "pi_id" })
  @ApiProperty({ example: '36' })
  piId: string;

  @Column("varchar", { name: "position_x", nullable: true, length: 50 })
  @ApiProperty({ example: '1.000' })
  positionX: string | null;

  @Column("varchar", { name: "position_y", nullable: true, length: 50 })
  @ApiProperty({ example: '2.00' })
  positionY: string | null;

  @Column("varchar", { name: "otp", nullable: true, length: 50 })
  @ApiProperty({ example: '000000' })
  otp: string | null;

  @Column("int", { name: "activated" })
  @ApiProperty({ example: 1 })
  activated: number;

  @ManyToOne(() => RaspberryPi, (raspberryPi) => raspberryPi.deviceDhts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "pi_id", referencedColumnName: "piId" }])
  pi: RaspberryPi;
}
