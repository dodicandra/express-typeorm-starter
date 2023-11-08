import {Column, Entity} from 'typeorm';

import {DefaultEntity} from './Entity';

@Entity({name: 'kecamatan'})
export class Kecamatan extends DefaultEntity {
  @Column({unique: true})
  name!: string;
}

@Entity({name: 'kelurahan'})
export class Kelurahan extends DefaultEntity {
  @Column({unique: true})
  name!: string;
}

@Entity({name: 'tps'})
export class Tps extends DefaultEntity {
  @Column({name: 'nomor_tps'})
  number!: string;

  @Column()
  kelurahan!: string;
}
