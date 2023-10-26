import {Column, Entity, OneToMany, OneToOne} from 'typeorm';

import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';
import {Photo} from './Photo';

@Entity({name: 'user_saksi'})
class UserWitness extends DefaultEntity {
  @Column()
  name!: string;

  @OneToOne(() => LiveCount, (u) => u.userWitness, {cascade: true, eager: true})
  votes?: LiveCount[];

  @OneToMany(() => Photo, (p) => p.userWitenss)
  photo?: Photo;
}

export {UserWitness};
