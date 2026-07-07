import { DataTypes } from 'sequelize';
import sequelize from '../infraestructura/db.js';

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Producto;
