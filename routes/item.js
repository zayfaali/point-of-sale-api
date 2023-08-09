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

      const itemStore = await Store.findOne({ _id: itemStoreID });
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

// ROUTE 3: Get all items and sort them
router.post("/getallitems", async (req, res) => {
  try {
    // Extract sorting parameter from the request body
    const { sortingString } = req.body;

    console.log("Received sortingString:", sortingString);

    let sortOptions = {};

    // Define default sorting options
    sortOptions = { itemPrice: 1 };

    // If a sorting string is provided, override the default sorting options
    if (sortingString) {
      switch (sortingString.toLowerCase()) {
        case "priceascending":
          sortOptions = { itemPrice: 1 };
          break;
        case "pricedescending":
          sortOptions = { itemPrice: -1 };
          break;
        case "alphabeticalorder":
          sortOptions = { itemName: 1 };
          break;
        default:
          return res
            .status(400)
            .json({ message: "Invalid sortingString, Sorted By itemPrice" });
      }
    }

    console.log("Sorting options:", sortOptions);

    // Find all items and sort them based on the provided sorting options
    const items = await Item.find().sort(sortOptions).exec();

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ROUTE 2 : get all items for the specific store

router.get("/store/:itemStoreID", async (req, res) => {
  try {
    const itemStoreID = req.params.itemStoreID;

    const items = await Item.find({ itemStoreID: itemStoreID });

    if (items.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for the given itemStoreID." });
    }

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
