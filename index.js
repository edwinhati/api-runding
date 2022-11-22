const express = require("express");
const app = express();
const routes = require("./src/router/");
const mongoose = require("mongoose");

app.use(express.json());
app.use("/", routes);
mongoose
  .connect(
    `mongodb+srv://user12345:runding12345@clusterrunding.dlaz7k4.mongodb.net/runding_database?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("Server started on port 4000");
    });
  });
