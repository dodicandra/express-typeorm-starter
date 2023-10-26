import 'express';

declare module 'express' {
  interface Request {
    cookies: {
      user_name: string;
      user_id: string;
      user_admin_token: string;
    };
  }
}
