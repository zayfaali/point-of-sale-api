const mongoose = require("mongoose");
const Item = require("./models/Item");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://huzaifaalix:abc@cluster0.sbxtbmv.mongodb.net/pointOfSale",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

console.log("Connected to MongoDB");

// Define a function to update documents
const updateDocuments = async () => {
  try {
    // Update all documents in the item collection to set the inStock attribute
    const result = await Item.updateMany({ $set: { inStock: 100 } });

    console.log(`${result.nModified} documents updated`);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

// Call the function to update documents
updateDocuments();
