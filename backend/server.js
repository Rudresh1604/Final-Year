require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const errorHandler = require("./middleware/errorHandler");
const loginRoutes = require("./routes/loginRoutes");
const auth = require("./middleware/auth");
const reportRoutes = require("./routes/reportRoutes");
const app = express();
const PORT = process.env.PORT || 3003;
app.use(express.json());

app.use(cors());
dbConnect();

app.use("/api/appointment", auth, appointmentRoutes);
app.use("/api/doctors", auth, doctorRoutes);
app.use("/api/patient", auth, patientRoutes);
app.use("/api/disease", auth, diseaseRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
