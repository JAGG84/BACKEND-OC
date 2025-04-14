
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Order = require('../models/order.model');
const User = require('../models/user.model');

let token = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Order.deleteMany({});
  await User.deleteMany({});

  await request(app).post('/api/auth/register').send({
    username: 'adminuser',
    password: 'adminpass',
    role: 'admin'
  });

  const login = await request(app).post('/api/auth/login').send({
    username: 'adminuser',
    password: 'adminpass'
  });

  token = login.body.accessToken;
});

describe('Order Endpoints', () => {
  let orderId;

  it('should create an order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        client: {
          name: 'Cliente Demo',
          email: 'demo@cliente.com',
          rfc: 'RFC123456789'
        },
        products: [
          { name: 'Producto 1', sku: 'SKU001', quantity: 2, unitPrice: 100 }
        ],
        estimatedDelivery: new Date().toISOString()
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('_id');
    orderId = res.body.data._id;
  });

  it('should get all orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should get order by id', async () => {
    const res = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data._id).toEqual(orderId);
  });

  it('should update order by id', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'asignada' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.status).toEqual('asignada');
  });

  it('should delete order by id', async () => {
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain('eliminada');
  });
});
