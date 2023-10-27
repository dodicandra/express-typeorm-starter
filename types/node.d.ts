declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      ENV: 'development' | 'production';
      PORT: number;
    }
  }
}

export {};
