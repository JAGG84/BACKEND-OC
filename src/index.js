
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db.config');

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
})();
