import {Column, Entity} from 'typeorm';

import {DefaultEntity} from './Entity';

@Entity({name: 'user_vote'})
class UserVote extends DefaultEntity {
  @Column()
  uniq_id!: string;

  @Column()
  name!: string;

  @Column()
  tps!: string;

  @Column()
  kecamatan!: string;

  @Column()
  kelurahan!: string;

  @Column()
  rt!: string;

  @Column()
  rw!: string;
}

export {UserVote};
