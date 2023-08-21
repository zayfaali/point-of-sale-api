const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const stripe = require("stripe")(
  "sk_test_51NfIgYJcWJYvh0WFHUb4ufjYjNGjkUId7YQhQAp90n5SLePybue77VY02ftgKSNGrDbftSMcweNbEv0Jbdz2Q1ez00AbiVjC3y"
);

//ROUTE 1 : api/payments/create-payment-intent
router.post("/create-payment-intent", async (req, res) => {
  const { total } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Implement your own function to calculate total amount
      currency: "usd",
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment intent." });
  }
});

module.exports = router;
