import {config} from 'dotenv';

config();

export const PORT = process.env.PORT;
export const host = process.env.ENV === 'production' ? process.env.HOST : `http://localhost:${PORT}`;
