const fs = require("fs");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
const addr = new mongoose.Schema({
  addr: String,
  nft: String,
});

const Pair = mongoose.model("Pair", addr);

module.exports = {
  Pair,
};


