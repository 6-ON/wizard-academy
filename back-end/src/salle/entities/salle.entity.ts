import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Salle {
@PrimaryGeneratedColumn()
  id: number;
  @Column()
  number: number;
  @Column()
  ability: string;

  /**
	 * @todo add department relation
	 */

}
