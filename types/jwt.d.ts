import 'jsonwebtoken';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    credential: {
      user_admin_token: string;
    };
  }
}
