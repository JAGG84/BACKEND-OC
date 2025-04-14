
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user.model');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
});

describe('Auth Endpoints', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'password123',
      role: 'admin'
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should login a user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'password123'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    token = res.body.accessToken;
  });

  it('should refresh token', async () => {
    const login = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'password123'
    });
    const refreshToken = login.body.refreshToken;

    const res = await request(app).post('/api/auth/refresh').send({
      refreshToken
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });
});
