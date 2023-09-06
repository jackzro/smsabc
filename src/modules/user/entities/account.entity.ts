import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from '../enums/user.enum';
import { Project } from 'src/modules/projects/entities/project.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column()
  companyName: string;

  @Column({ default: 0 })
  token: number;

  @Column()
  contactNumber: string;

  @Column({ type: 'enum', enum: UserRoles })
  @Column()
  role: UserRoles;

  @OneToMany(() => Project, (projects) => projects.user)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
