import {CookieOptions} from 'express';

export const cookieOptions: CookieOptions = {
  domain: process.env.ENV === 'development' ? 'localhost' : 'rikahanom.com',
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 24 * 30,
};
