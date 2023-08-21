const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

//ROUTE 1 : api/order/create-order
router.post("/create-order", async (req, res) => {
  try {
    const { cartItems, totalPrice } = req.body;

    // Create an array of order items based on cart items
    const orderItems = cartItems.map((cartItem) => ({
      itemId: cartItem._id,
      quantity: cartItem.quantity,
    }));

    // Create a new order document
    const newOrder = new Order({
      orderItems,
      totalPrice,
    });

    // Save the new order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully.", orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

// ROUTE 2 : api/order/getorders
router.get("/getorders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
