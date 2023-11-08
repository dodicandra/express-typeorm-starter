import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import {DefaultEntity} from './Entity';
import {VoterSuperVisor} from './VoterSupervisor';

@Entity({name: 'user_voter'})
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

  @Column({nullable: true})
  hp?: string;

  @ManyToOne(() => VoterSuperVisor, (v) => v.voter)
  @JoinColumn()
  supervisor?: VoterSuperVisor;
}

export {UserVote};
