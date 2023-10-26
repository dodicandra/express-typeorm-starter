import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from 'typeorm';

import {Caleg} from './Caleg';
import {DefaultEntity} from './Entity';
import {Photo} from './Photo';
import {UserWitness} from './Witness';

@Entity({name: 'caleg_live_count'})
class LiveCount extends DefaultEntity {
  @Column({name: 'caleg_count'})
  count!: number;

  @OneToMany(() => Photo, (u) => u.votes)
  userWitnessPhoto: Photo[];

  @OneToOne(() => UserWitness, (u) => u.votes)
  @JoinColumn()
  userWitness: UserWitness;

  @ManyToOne(() => Caleg)
  caleg: Caleg;
}

export {LiveCount};
