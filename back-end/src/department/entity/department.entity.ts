import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}