import express from 'express';
import routes from './api/routes/index.js';
import sequelize from './config/database.js';
import './api/models/index.js';

const app = express();

app.use(express.json());
app.use(
    express.urlencoded(
        {
            extended: true
        }
    )
);

app.use('/api', routes);

// Sincroniza o banco de dados e inicia o servidor
// force: false não apaga os dados. alter: true atualiza tabelas se houver mudanças.
sequelize.sync({ force: false, alter: true }).then(() => {
    console.log('Banco de dados sincronizado com sucesso.');
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});