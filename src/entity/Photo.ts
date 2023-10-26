import {Column, Entity, ManyToOne} from 'typeorm';

import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';
import {UserWitness} from './Witness';

@Entity({name: 'photo'})
class Photo extends DefaultEntity {
  @Column()
  path!: string;

  @ManyToOne(() => LiveCount, (u) => u.userWitnessPhoto)
  votes?: LiveCount;

  @ManyToOne(() => UserWitness, (u) => u.photo)
  userWitenss?: UserWitness;
}

export {Photo};
