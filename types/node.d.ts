type ObjectKeys<T> = T extends object
  ? (keyof T & string)[]
  : T extends number
    ? []
    : T extends Array<any> | string
      ? string[]
      : never;

type MapedKey<T> = {[K in keyof T]-?: [K, T[K]]}[keyof T];
type Entries<T> = T extends ArrayLike<infer U> ? [string, U][] : MapedKey<T>[];

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      ENV: 'development' | 'production';
      PORT: string;
    }
  }

  interface ObjectConstructor {
    keys<T extends object>(o: T): ObjectKeys<T>;
    entries<T>(o: T): Entries<T>;
    assign<T, U>(target: T, source: U): T & U;
  }
}

export {};
