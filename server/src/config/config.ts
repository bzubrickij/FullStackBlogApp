import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const { DB_CONNECTION_URL } = process.env;

if (DB_CONNECTION_URL === undefined) {
  throw new Error('Please fill out variables in src/config/.env file');
}

const config = {
  db: {
    connectionUrl: DB_CONNECTION_URL,
  },
};

export default config;


