import { DataTypes } from 'sequelize';
import sequelize from '../infraestructura/db.js';

const Venta = sequelize.define('Venta', {
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  importe: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Venta;
