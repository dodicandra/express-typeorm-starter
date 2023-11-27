import {Column, Entity} from 'typeorm';

import {DefaultEntity} from './Entity';

@Entity({name: 'config'})
class Config extends DefaultEntity {
  @Column({type: 'bigint'})
  date!: number;
}

export {Config};
