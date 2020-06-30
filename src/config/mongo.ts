const config = {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  database: process.env.MONGO_DB,
};

const generateTestId = () => {
  return Math.floor(Math.random() * 10000);
};

export const createMongoUrl = () => {
  if (process.env.NODE_ENV === 'test') {
    const { MONGO_URL } = process.env;
    const url = MONGO_URL!!.substring(0, MONGO_URL.length - 1);

    return `${url}-${generateTestId()}`;
  }

  return `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
};
