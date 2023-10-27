import {Column, Entity, OneToMany, OneToOne, Unique} from 'typeorm';

import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';
import {Photo} from './Photo';

@Entity({name: 'user_saksi'})
@Unique(['email'])
class UserWitness extends DefaultEntity {
  @Column()
  name!: string;

  @Column({unique: true})
  email!: string;

  @OneToOne(() => LiveCount, (u) => u.userWitness, {cascade: true, eager: true})
  vote?: LiveCount;

  @OneToMany(() => Photo, (p) => p.userWitenss)
  photo?: Photo;
}

export {UserWitness};
