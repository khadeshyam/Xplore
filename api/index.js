const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const blogRoute = require("./routes/blogs");
const categoryRoute = require("./routes/categories");
const cors = require('cors');
const path = require("path");

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

mongoose
  .connect(process.env.MONGO_URL, {
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", blogRoute);
app.use("/api/categories", categoryRoute);



app.get('/*', function (req, res) {
  console.log('path on /* ',req.path);
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen("5000", () => {
  console.log("Backend is running.");
});
