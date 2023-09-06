import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Length, isEmail, Max } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Max(11)
  senderId: string;

  @Column()
  TglKirim: Date;

  @Column()
  @Max(160)
  IsiBerita: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
