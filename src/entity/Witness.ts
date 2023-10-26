import {Column, Entity, OneToMany} from 'typeorm';

import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';

@Entity({name: 'user_saksi'})
class UserWitness extends DefaultEntity {
  @Column()
  name!: string;

  @OneToMany(() => LiveCount, (u) => u.userWitness)
  votes?: LiveCount[];
}

export {UserWitness};
