import 'express';

declare module 'express' {
  interface Request {
    cookies: {
      user_witness_email?: string;
      user_witness_id?: string;
      user_admin_token?: string;
      supervisor_token?: string;
    };
  }

  interface Response {
    cookie(name: keyof Request['cookies'], val: any, options?: CookieOptions): this;
  }
}
