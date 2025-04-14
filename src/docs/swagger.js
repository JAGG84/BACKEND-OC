
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Órdenes de Compra - COAL Logistics',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de órdenes de compra',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            sku: { type: 'string' },
            quantity: { type: 'integer' },
            unitPrice: { type: 'number' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            client: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                rfc: { type: 'string' }
              }
            },
            products: {
              type: 'array',
              items: { $ref: '#/components/schemas/Product' }
            },
            status: { type: 'string' },
            estimatedDelivery: { type: 'string', format: 'date-time' },
            assignedTo: { type: 'string' }
          }
        }
      }
    },
    paths: {
      '/orders': {
        post: {
          summary: 'Crear una nueva orden',
          tags: ['Órdenes'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' }
              }
            }
          },
          responses: {
            201: {
              description: 'Orden creada'
            }
          }
        },
        get: {
          summary: 'Obtener todas las órdenes',
          tags: ['Órdenes'],
          responses: {
            200: {
              description: 'Lista de órdenes'
            }
          }
        }
      },
      '/orders/{id}': {
        get: {
          summary: 'Obtener una orden por ID',
          tags: ['Órdenes'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Orden encontrada' },
            404: { description: 'Orden no encontrada' }
          }
        },
        put: {
          summary: 'Actualizar una orden',
          tags: ['Órdenes'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Order' }
              }
            }
          },
          responses: {
            200: { description: 'Orden actualizada' },
            404: { description: 'Orden no encontrada' }
          }
        },
        delete: {
          summary: 'Eliminar una orden',
          tags: ['Órdenes'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' }
            }
          ],
          responses: {
            200: { description: 'Orden eliminada' },
            404: { description: 'Orden no encontrada' }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
