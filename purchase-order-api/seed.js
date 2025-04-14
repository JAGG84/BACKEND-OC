
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/user.model');
const connectDB = require('./src/config/db.config');

const seed = async () => {
  await connectDB();
  await User.deleteMany();

  const users = [
    {
      username: 'adminuser',
      password: await bcrypt.hash('adminpass', 10),
      role: 'admin'
    },
    {
      username: 'operator1',
      password: await bcrypt.hash('operatorpass', 10),
      role: 'operator'
    },
    {
      username: 'viewer1',
      password: await bcrypt.hash('viewerpass', 10),
      role: 'viewer'
    }
  ];

  await User.insertMany(users);
  console.log('🌱 Usuarios de prueba insertados');
  mongoose.connection.close();
};

seed();
