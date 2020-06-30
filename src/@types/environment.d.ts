declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      NODE_ENV: 'development' | 'test' | 'production';
      MORGAN?: string;
      MONGO_URL?: string;
      MONGO_HOST: string;
      MONGO_USER: string;
      MONGO_PASS: string;
      MONGO_DB: string;
      MONGO_PORT: number;
    }
  }
}

export {};
