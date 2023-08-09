const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchadmin = require("../middleware/fetchadmin");
const Store = require("../models/Store");

//ROUTE 1 : ADD STORE (LOGIN REQUIRED)
// api/stores/addstore

router.post(
  "/addstore",
  fetchadmin,
  [
    body("storeName", "Enter a valid name").isLength({ min: 3 }),
    body("storeDesc", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("storePic", "Enter A valid Picture Url").isURL(),
    body("storeLocation", "Enter a valid Location").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { storeName, storeDesc, storePic, storeLocation } = req.body;
      // if there are errors in the validation result return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Create the store
      // Create a new user
      const store = await Store.create({
        storeName: req.body.storeName,
        storeDesc: req.body.storeDesc,
        storePic: req.body.storePic,
        storeLocation: req.body.storeLocation,
      });

      res.json(store);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2 : GET STORES (LOGIN REQUIRED)
// api/stores/getallstores

router.get("/getstores", fetchadmin, async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// get the store details through the item store id
//api/stores/:itemStoreID
router.get("/:itemStoreID", async (req, res) => {
  try {
    const itemStoreID = req.params.itemStoreID;

    const store = await Store.findOne({ _id: itemStoreID });

    if (!store) {
      return res
        .status(404)
        .json({ message: "Store not found for the given itemStoreID." });
    }

    res.json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
