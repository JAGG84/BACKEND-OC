
const Order = require('../models/order.model');

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    res.status(200).json({ success: true, message: 'Orden eliminada correctamente' });
  } catch (err) {
    next(err);
  }
};

// Reporte: total de órdenes por estado
exports.getOrdersByStatus = async (req, res, next) => {
  try {
    const report = await Order.aggregate([
      { $group: { _id: "$status", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

// Reporte: órdenes por cliente
exports.getOrdersByClient = async (req, res, next) => {
  try {
    const report = await Order.aggregate([
      { $group: { _id: "$client.email", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

// Reporte: total de órdenes por mes
exports.getOrdersByMonth = async (req, res, next) => {
  try {
    const report = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ]);
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};
