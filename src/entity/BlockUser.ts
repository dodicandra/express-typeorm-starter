import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';

import {DefaultEntity} from './Entity';
import {VoterSuperVisor} from './VoterSupervisor';

@Entity({name: 'block_user'})
class BlockUser extends DefaultEntity {
  @Column()
  blocked!: boolean;

  @OneToOne(() => VoterSuperVisor)
  @JoinColumn()
  user?: VoterSuperVisor;
}

export {BlockUser};
