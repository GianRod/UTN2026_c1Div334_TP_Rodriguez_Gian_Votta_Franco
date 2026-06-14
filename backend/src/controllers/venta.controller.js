import { Venta, Producto } from '../models/index.js';
import ExcelJS from 'exceljs';

const registrarVenta = async (req, res) => {
  try {
    const { nombre_usuario, productos } = req.body;

    let importe = 0;
    productos.forEach(p => { importe += p.precio * p.cantidad; });

    const venta = await Venta.create({ nombre_usuario, importe });

    for (const item of productos) {
      const producto = await Producto.findByPk(item.id);
      if (producto) {
        await venta.addProducto(producto, { through: { cantidad: item.cantidad } });
      }
    }

    const ventaConProductos = await Venta.findByPk(venta.id, { include: Producto });
    res.status(201).json(ventaConProductos);
  } catch (error) {
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
