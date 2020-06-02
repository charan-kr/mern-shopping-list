const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

// database path
const db = config.get("mongoURI");

//mongodb connection
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//mongodb status
mongoose.connection.on("connected", () =>
  console.log(`connected to server at ${db}`)
);
mongoose.connection.on("error", () => console.log(`error`));

//start express server
const app = express();

//Middlewears
app.use(cors()); // cross-platform use
app.use(express.json()); //Body parser

//Routes
app.use("/items", require("./routes/items"));
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));

//Serve static assests if in production
app.use("/static", express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//localhost:5000 port
const PORT = process.env.PORT || 5000;

//start listentning on the port
app.listen(PORT, () => console.log(`listening @ PORT : ${PORT}`));
