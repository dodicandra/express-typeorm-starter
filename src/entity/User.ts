import {Column, Entity} from 'typeorm';

import {DefaultEntity} from './Entity';

namespace UserInterface {
  export type Role = 'admin' | 'super_admin';
}

@Entity({name: 'user_admin'})
class User extends DefaultEntity {
  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  role!: UserInterface.Role;
}
export {User, UserInterface};
