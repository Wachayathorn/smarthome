import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RaspberryPi } from "./raspberry-pi";

@Entity("User", { schema: "Smart-Home" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: string;

  @Column("varchar", { name: "fname", nullable: true, length: 255 })
  @ApiProperty({ example: 'Firstname' })
  fname: string | null;

  @Column("varchar", { name: "lname", nullable: true, length: 255 })
  @ApiProperty({ example: 'Lastname' })
  lname: string | null;

  @Column("datetime", { name: "create_time" })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  createTime: Date;

  @Column("datetime", { name: "first_access", nullable: true })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  firstAccess: Date | null;

  @Column("datetime", { name: "last_access", nullable: true })
  @ApiProperty({ example: '2021-05-08 16:03:38' })
  lastAccess: Date | null;

  @Column("varchar", { name: "username", length: 128 })
  @ApiProperty({ example: 'USERNAME' })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  @ApiProperty({ example: 'PASSWORD' })
  password: string;

  @OneToMany(() => RaspberryPi, (raspberryPi) => raspberryPi.user)
  @ApiProperty({ example: [RaspberryPi.prototype] })
  raspberryPis: RaspberryPi[];
}
