import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import router from './api/routes/index.js'; 
import './api/models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com Supabase estabelecida!');

        await sequelize.sync({ force: false, alter: true });
        console.log('Banco de dados sincronizado.');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro fatal ao iniciar o servidor:', error);
    }
}

startServer();