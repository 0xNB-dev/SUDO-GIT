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

// async function find1() {

//   Pair.collection.drop();
//   const pairs = JSON.parse(fs.readFileSync("Pairs.json", "utf-8"));
//   await Pair.insertMany(pairs);
//   console.log(await Pair.find({}));
// }

// find1();
