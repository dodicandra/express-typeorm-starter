import {config} from 'dotenv';

config();

export const PORT = process.env.ENV === 'production' ? process.env.PORT : 3000;
export const host = process.env.ENV === 'production' ? process.env.HOST : `http://localhost:${PORT}`;
