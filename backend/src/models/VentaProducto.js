import { DataTypes } from 'sequelize';
import sequelize from '../infraestructura/db.js';

const VentaProducto = sequelize.define('venta_productos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  VentaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProductoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

export default VentaProducto;
