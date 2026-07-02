import sequelize from '../infraestructura/db.js';
import Producto from './Producto.js';
import Usuario from './Usuario.js';
import Venta from './Venta.js';

Venta.belongsToMany(Producto, { through: 'venta_productos' });
Producto.belongsToMany(Venta, { through: 'venta_productos' });

const syncDB = async () => {
  await sequelize.sync();
  console.log('Base de datos sincronizada.');
};

export { sequelize, Producto, Usuario, Venta, syncDB };
