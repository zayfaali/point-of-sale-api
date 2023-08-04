const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://huzaifaalix:abc@cluster0.sbxtbmv.mongodb.net/pointOfSale";
const connectToMongo = () => {
  mongoose.connect(mongoURI);
};

module.exports = connectToMongo;
