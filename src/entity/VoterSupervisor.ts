import {Column, Entity, OneToMany} from 'typeorm';

import {DefaultEntity} from './Entity';
import {UserVote} from './UserVote';

@Entity({name: 'user_voter_supervisor'})
class VoterSuperVisor extends DefaultEntity {
  @Column()
  name!: string;

  @Column({unique: true})
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => UserVote, (u) => u.supervisor)
  voter?: UserVote[];
}
export {VoterSuperVisor};
