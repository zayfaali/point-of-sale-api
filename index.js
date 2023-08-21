const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/adminauth", require("./routes/adminAuthentication"));
app.use("/api/stores", require("./routes/stores"));
app.use("/api/item", require("./routes/item"));
app.use("/api/payments", require("./routes/payment"));
app.use("/api/order", require("./routes/orders"));

app.listen(port, () => {
  console.log(`Point Of Sale backend is listening at http://localhost:${port}`);
});
