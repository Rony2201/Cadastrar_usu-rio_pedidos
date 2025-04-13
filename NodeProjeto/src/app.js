import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import usuarioRoutes from './routes/usuarioRoutes.js'; 
import pedidoRoutes from './routes/pedidoRoutes.js';

const app = express();
app.use(cors()); 

app.use(express.json());

app.use('/usuario', usuarioRoutes);
app.use('/', pedidoRoutes);

app.get('/', (req, res) => {
  res.send('Olá Mundo!');
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado com sucesso ao PostgreSQL!');
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Erro ao conectar ou criar tabelas:', error);
  }
})();

export default app;
