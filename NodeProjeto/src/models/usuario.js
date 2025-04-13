// models/Usuario.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'criadoEm',
    updatedAt: false,
});

export default Usuario;
