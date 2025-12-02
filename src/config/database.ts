import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL não encontrada no arquivo .env');
}

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false, 
    dialectOptions: {
        ssl: {
            require: true, 
            rejectUnauthorized: false
        }
    }
});

export default sequelize;