require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const RequestUrl = process.env.REQUEST_URL || process.env.REQUEST_URL1 || 3000;
const PORT = process.env.PORT || 3003;
require("./config/dbConnect");

const portfolioRoute = require("./Routes/portFolio");
app.use(express.json());

app.use(cors());

app.use("/api/portfolio", portfolioRoute);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
