const express = require("express");
const cors = require("./config/cors");
const contactRoutes = require("./routes/contact.routes");
const careerRoutes = require("./routes/career.routes");
const newsletterRoutes = require("./routes/newsletter.routes");

require("dotenv").config();

const app = express();

app.use(cors);
app.use(express.json()); // 🔥 REQUIRED
app.use(express.urlencoded({ extended: true })); // 🔥 REQUIRED

app.use("/contact", contactRoutes);
app.use("/career", careerRoutes);
app.use("/newsletter", newsletterRoutes);

module.exports = app;
