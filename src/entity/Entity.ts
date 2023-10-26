import {Exclude} from 'class-transformer';
import {CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace DefaultEntity {
  type OmitFunc<T> = {
    [K in keyof T]-?: T[K] extends Function ? K : never;
  }[keyof T];

  export type EntityParam<T> = Omit<T, OmitFunc<T>>;
}

abstract class DefaultEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  @Index()
  id?: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export {DefaultEntity};
