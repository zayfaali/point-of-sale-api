const mongoose = require("mongoose");
const { Schema } = mongoose;

const StoreSchema = new Schema({
  storeName: {
    type: String,
    required: true,
    unique: true,
  },
  storePic: {
    type: String,
    required: true,
  },
  storeDesc: {
    type: String,
    required: true,
  },
  storeLocation: {
    type: String,
    required: true,
  },
});

const Store = mongoose.model("store", StoreSchema);
module.exports = Store;
