import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test', 'postgres', 'admin123', {
    host: 'localhost',
    dialect: 'postgres',
  });
  

export default sequelize;
