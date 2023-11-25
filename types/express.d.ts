import 'express';

declare module 'express' {
  interface Request {
    cookies: {
      user_witness_token?: string;
      user_admin_token?: string;
      supervisor_token?: string;
    };
  }

  interface Response {
    cookie(name: keyof Request['cookies'], val: any, options?: CookieOptions): this;
    clearCookie(name: keyof Request['cookies'], options?: CookieOptions): this;
  }
}
