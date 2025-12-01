import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL não definida no arquivo .env');
}

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false, 
});

export default sequelize;
