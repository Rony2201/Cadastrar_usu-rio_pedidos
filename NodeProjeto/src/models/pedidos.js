import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './usuario.js'; 

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dataPedido: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pedidos',
  timestamps: false,
});


Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' }); 
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });    // Um usuário pode ter muitos pedidos

export default Pedido;
