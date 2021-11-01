import { Sequelize } from 'sequelize';
import CONFIG from '../../common/config';

const db = new Sequelize({
  database: CONFIG.DATABASE_NAME,
  username: CONFIG.DATABASE_USERNAME,
  password: CONFIG.DATABASE_PASSWORD,
  host: CONFIG.DATABASE_HOST,
  port: (CONFIG.DATABASE_PORT as number | undefined) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
});

export default db;
