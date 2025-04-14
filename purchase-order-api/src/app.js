
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares globales
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100
}));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', routes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;
