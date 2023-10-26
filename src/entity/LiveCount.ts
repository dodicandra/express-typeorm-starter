import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

import {DefaultEntity} from './Entity';
import {Photo} from './Photo';
import {UserWitness} from './Witness';

@Entity({name: 'caleg_live_count'})
class LiveCount extends DefaultEntity {
  @Column({name: 'caleg_name'})
  name!: string;

  @Column({name: 'caleg_count'})
  count!: number;

  @OneToMany(() => Photo, (u) => u.votes)
  userWitnessPhoto: Photo[];

  @ManyToOne(() => UserWitness, (u) => u.votes)
  userWitness: UserWitness;
}

export {LiveCount};
