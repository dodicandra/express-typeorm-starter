import {Column, Entity, ManyToOne} from 'typeorm';

import {DefaultEntity} from './Entity';
import {LiveCount} from './LiveCount';

@Entity({name: 'photo'})
class Photo extends DefaultEntity {
  @Column()
  path!: string;

  @ManyToOne(() => LiveCount, (u) => u.userWitnessPhoto)
  votes?: LiveCount;
}

export {Photo};
