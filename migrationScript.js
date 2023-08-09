const mongoose = require("mongoose");
const Item = require("./models/Item");

async function migrateItemPrices() {
  const items = await Item.find();

  for (const item of items) {
    const newPrice = parseFloat(item.itemPrice);
    await item.updateOne({ $set: { itemPrice: newPrice } });
  }

  console.log("Migration complete.");
}

// Connect to MongoDB and run the migration script
mongoose.connect(
  "mongodb+srv://huzaifaalix:abc@cluster0.sbxtbmv.mongodb.net/pointOfSale",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", async () => {
  await migrateItemPrices();
  mongoose.disconnect();
});
