import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../../', process.env.DB_PATH || 'database.sqlite'),
  logging: false,
});

export default sequelize;
