import {
  Column,
  Entity,
  ObjectId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn() id: ObjectId;

  @Column({ type: 'varchar', length: 255 }) name: string;

  @Column({ type: 'varchar', length: 255, unique: true }) email: string;

  @Column({ type: 'varchar', length: 255 }) password: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) team: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'user' })
  role: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  idea: boolean;

  @Column({ type: 'integer', nullable: true, default: 1 })
  memberCount: number;
}
