import { Client } from 'pg';

export const createDBConnection = async () => {
  const {
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    PG_USERNAME,
    PG_PASSWORD,
  } = process.env;

  const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 20000,
  };

  const dbClient = new Client(dbOptions);

  dbClient
    .connect()
    .then(() => console.log('connection success'))
    .catch(err => console.log('connection error', err.stack));

  return dbClient;
};
