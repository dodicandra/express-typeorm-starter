import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Locals {
    user_witness_token: {email: string; id: number; name: string};
    supervisor_token: {email: string; password: string; name: string};
  }
}
