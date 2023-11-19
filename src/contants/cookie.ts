import {CookieOptions} from 'express';

export const cookieOptions: CookieOptions = {
  domain: 'rikahanom.com',
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 30,
};
