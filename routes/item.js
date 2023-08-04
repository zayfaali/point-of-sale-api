const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchadmin = require("../middleware/fetchadmin");
const Item = require("../models/Item");
const Store = require("../models/Store");

//ROUTE 1 : ADD ITEM (LOGIN REQUIRED)
//  api/item/additem

router.post(
  "/additem",
  [
    body("itemStoreID", "Enter a valid ID").isAlphanumeric(),
    body("itemName", "Enter a valid name").isLength({ min: 3 }),
    body("itemDesc", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("itemPic", "Enter A valid Picture Url").isURL(),
    body("itemPrice", "Enter a valid Price").isNumeric(),
  ],
  async (req, res) => {
    try {
      const { itemStoreID } = req.body;
      // if there are errors in the validation result return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const itemStore = Store.find({ id: itemStoreID });
      if (!itemStore) {
        return res.status(404).send("Item Store Not Found");
      }

      // ADD ITEM TO THE DATABASE
      const item = await Item.create({
        itemStoreID: req.body.itemStoreID,
        itemName: req.body.itemName,
        itemDesc: req.body.itemDesc,
        itemPic: req.body.itemPic,
        itemPrice: req.body.itemPrice,
      });

      res.json(item);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2 : get all items for the specific store
// api/item/getitems

router.get(
  "/getitems",
  [body("itemStoreID", "Enter a valid ID").isAlphanumeric()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const items = await Item.find({ itemStoreID: req.body.itemStoreID });
      res.json(items);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
