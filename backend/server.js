require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3003;
require("./config/dbConnect");

app.use(express.json());

app.use(cors());


app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
