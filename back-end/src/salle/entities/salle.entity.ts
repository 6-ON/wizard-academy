import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Salle {
@PrimaryGeneratedColumn()
  id: number;
  @Column()
  number: number;
  @Column()
  capacity: string;

  /**
	 * @todo add department relation
	 */

}
