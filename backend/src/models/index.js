import sequelize from '../infraestructura/db.js';
import Producto from './Producto.js';
import Usuario from './Usuario.js';
import Venta from './Venta.js';
import VentaProducto from './VentaProducto.js';

Venta.hasMany(VentaProducto, { foreignKey: 'VentaId', as: 'detalles' });
Producto.hasMany(VentaProducto, { foreignKey: 'ProductoId', as: 'detalles' });
VentaProducto.belongsTo(Venta, { foreignKey: 'VentaId' });
VentaProducto.belongsTo(Producto, { foreignKey: 'ProductoId' });
Venta.belongsToMany(Producto, { through: VentaProducto, foreignKey: 'VentaId', otherKey: 'ProductoId' });
Producto.belongsToMany(Venta, { through: VentaProducto, foreignKey: 'ProductoId', otherKey: 'VentaId' });

const syncDB = async () => {
  await sequelize.sync();
  console.log('Base de datos sincronizada.');
};

export { sequelize, Producto, Usuario, Venta, VentaProducto, syncDB };
