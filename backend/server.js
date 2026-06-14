import 'dotenv/config';
import app from './app.js';
import { syncDB } from './src/models/index.js';

const PORT = process.env.PORT || 3000;

syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/productos`);
    console.log(`Admin: http://localhost:${PORT}/admin/login`);
  });
});
