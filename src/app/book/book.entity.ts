import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'delete_by' })
  delete_by: User;

  @Column({ default: false })
  is_deleted: boolean;

  @Column()
  judul: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  tahun_terbit: number;

  @Column()
  harga: number;

  @Column()
  penulis: string;

  @Column('text')
  deskripsi: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
