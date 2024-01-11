import {AfterLoad, Column, Entity, ManyToOne} from 'typeorm';

import {host} from '../config';
import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';
import {UserWitness} from './Witness';

@Entity({name: 'photo'})
class Photo extends DefaultEntity {
  @Column()
  filed!: string;

  @Column()
  path!: string;

  @ManyToOne(() => LiveCount, (u) => u.userWitnessPhoto)
  votes?: LiveCount;

  @ManyToOne(() => UserWitness, (u) => u.photo)
  userWitenss?: UserWitness;

  @AfterLoad()
  updatePath?() {
    this.path = `${host}/uploads/${this.path}`;
  }
}

export {Photo};
