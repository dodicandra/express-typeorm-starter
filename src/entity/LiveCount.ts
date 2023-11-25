import {Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique} from 'typeorm';

import {Caleg} from './Caleg';
import {DefaultEntity} from './Entity';
import {Photo} from './Photo';
import {UserWitness} from './Witness';

@Entity({name: 'caleg_live_count'})
@Unique(['userWitness', 'caleg'])
class LiveCount extends DefaultEntity {
  @Column({name: 'caleg_count'})
  count!: number;

  @OneToMany(() => Photo, (u) => u.votes)
  userWitnessPhoto?: Photo[];

  @ManyToOne(() => UserWitness, (u) => u.vote)
  @JoinColumn({referencedColumnName: 'email'})
  userWitness?: UserWitness;

  @ManyToOne(() => Caleg, (c) => c.votes)
  @JoinColumn()
  caleg?: Caleg;

  @Column({nullable: true})
  tps?: string;

  @Column({nullable: true})
  kelurahan?: string;
}

export {LiveCount};
