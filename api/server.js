const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const stocksBoughtRoutes = require("./routes/stocksBought");
const sellsRoutes = require("./routes/sells");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/buys", stocksBoughtRoutes);
app.use("/sells",sellsRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});


module.exports = app;
