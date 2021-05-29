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
  @PrimaryGeneratedColumn({ type: "int", name: "dht_id" })
  dhtId: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "status", nullable: true })
  status: number | null;

  @Column("int", { name: "is_online" })
  isOnline: number;

  @Column("varchar", { name: "temperature", nullable: true, length: 10 })
  temperature: string | null;

  @Column("varchar", { name: "moisture", nullable: true, length: 10 })
  moisture: string | null;

  @Column("datetime", { name: "sw_last_update", nullable: true })
  swLastUpdate: Date | null;

  @Column("datetime", { name: "hw_last_update", nullable: true })
  hwLastUpdate: Date | null;

  @Column("int", { name: "pi_id" })
  piId: string;

  @Column("varchar", { name: "position_x", nullable: true, length: 50 })
  positionX: string | null;

  @Column("varchar", { name: "position_y", nullable: true, length: 50 })
  positionY: string | null;

  @Column("varchar", { name: "otp", nullable: true, length: 50 })
  otp: string | null;

  @ManyToOne(() => RaspberryPi, (raspberryPi) => raspberryPi.deviceDhts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "pi_id", referencedColumnName: "piId" }])
  pi: RaspberryPi;
}
