require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const middleware = require("./middlewares/middleware");
const loginController = require("./controllers/userLogin");
const signupController = require("./controllers/userSignup");
const getController = require("./controllers/getEmployees");
const getExcavator = require("./controllers/getExcavator");
const excavatorController = require("./controllers/excavatorController");
const idleHoursController = require("./controllers/idleHoursController");
const getIdleHoursController = require("./controllers/getIdleHoursController");

const app = express();
app.use(middleware);

const port = process.env.PORT || 5000;

connectDB();

app.get("/api/employees", getController.getEmployees);
app.post("/api/auth/login", loginController.Login);
app.post("/api/auth/signup", signupController.Signup);

app.get("/api/excavator", getExcavator.getExcavator);
app.post("/api/excavator", excavatorController.createExcavator);

app.get("/api/idlehours/", getIdleHoursController.getIdleHours);
app.post("/api/idlehours/", idleHoursController.createIdleHours);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
