import {Column, Entity, OneToMany} from 'typeorm';

import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';

@Entity({name: 'caleg'})
class Caleg extends DefaultEntity {
  @Column({name: 'caleg_name'})
  name!: string;

  @OneToMany(() => LiveCount, (l) => l.caleg)
  votes?: LiveCount;
}

export {Caleg};
