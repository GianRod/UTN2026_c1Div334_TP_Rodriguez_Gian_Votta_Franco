import { sequelize, Venta, Producto, VentaProducto } from '../models/index.js';
import ExcelJS from 'exceljs';

const registrarVenta = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { nombre_usuario, productos } = req.body;

    let importe = 0;
    const itemsValidados = [];

    for (const item of productos) {
      const producto = await Producto.findByPk(item.id, { transaction });
      const cantidad = Number(item.cantidad);

      if (!producto || !producto.activo) {
        await transaction.rollback();
        return res.status(404).json({ error: `Producto ${item.id} no disponible.` });
      }

      if (producto.stock < cantidad) {
        await transaction.rollback();
        return res.status(400).json({ error: `Stock insuficiente para ${producto.nombre}.` });
      }

      importe += Number(producto.precio) * cantidad;
      itemsValidados.push({ producto, cantidad });
    }

    const venta = await Venta.create({ nombre_usuario, importe }, { transaction });

    for (const item of itemsValidados) {
      await VentaProducto.create({
        VentaId: venta.id,
        ProductoId: item.producto.id,
        cantidad: item.cantidad,
      }, { transaction });

      await item.producto.decrement('stock', { by: item.cantidad, transaction });
    }

    await transaction.commit();

    const ventaConProductos = await Venta.findByPk(venta.id, {
      include: Producto,
    });

    res.status(201).json(ventaConProductos);
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({ error: error.message });
  }
};

const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({ include: Producto, order: [['createdAt', 'DESC']] });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const descargarExcel = async (req, res) => {
  try {
    const ventas = await Venta.findAll({ include: Producto, order: [['createdAt', 'DESC']] });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Ventas');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Usuario', key: 'nombre_usuario', width: 20 },
      { header: 'Fecha', key: 'fecha', width: 20 },
      { header: 'Importe Total', key: 'importe', width: 15 },
      { header: 'Productos', key: 'productos', width: 40 },
    ];

    ventas.forEach(v => {
      const productosStr = v.Productos
        ? v.Productos.map(p => `${p.nombre} x${p.venta_productos?.cantidad ?? 1}`).join(', ')
        : '';
      sheet.addRow({
        id: v.id,
        nombre_usuario: v.nombre_usuario,
        fecha: new Date(v.fecha).toLocaleString('es-AR'),
        importe: v.importe,
        productos: productosStr,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=ventas.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registrarVenta, listarVentas, descargarExcel };
