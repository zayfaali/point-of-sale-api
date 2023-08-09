const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  itemStoreID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "store",
  },
  itemName: {
    type: String,
    required: true,
    unique: true,
  },
  itemPic: {
    type: String,
    required: true,
  },
  itemDesc: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
