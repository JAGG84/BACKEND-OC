
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  client: {
    name: String,
    email: String,
    rfc: String
  },
  products: [{
    name: String,
    sku: String,
    quantity: Number,
    unitPrice: Number
  }],
  status: {
    type: String,
    enum: ['pendiente', 'asignada', 'en tránsito', 'entregada', 'cancelada'],
    default: 'pendiente'
  },
  estimatedDelivery: Date,
  assignedTo: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
