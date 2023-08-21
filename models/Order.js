const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item", // Reference to your Item model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  orderItems: [orderItemSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
