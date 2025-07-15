require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const app = express();
const PORT = process.env.PORT || 3003;
app.use(express.json());

app.use(cors());
dbConnect();

app.use("/api/doctors", doctorRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/disease", diseaseRoutes);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
