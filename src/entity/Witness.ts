import {Column, Entity, OneToOne} from 'typeorm';

import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';

@Entity({name: 'user_saksi'})
class UserWitness extends DefaultEntity {
  @Column()
  name!: string;

  @OneToOne(() => LiveCount, (u) => u.userWitness, {cascade: true, eager: true})
  votes?: LiveCount[];
}

export {UserWitness};
