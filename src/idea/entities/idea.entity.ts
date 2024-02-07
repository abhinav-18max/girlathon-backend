import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'idea' })
export class Idea {
  @PrimaryGeneratedColumn()
  id: ObjectId;
  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Column({ type: 'varchar', length: 255 })
  category: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column({ type: 'varchar', length: 255 })
  team: string;
  @Column({ type: 'boolean', default: false })
  markdown: boolean;
  @Column({type: 'varchar', length: 255, nullable: true})
  email: string;
}
