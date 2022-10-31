const mongoose = require("mongoose");
const {Pair } = require( "./db.js")

console.log("look-------------------------")


async function find() {
  const res = await Pair.find({
    nft: "NFT_ADDRESS"
  }, "addr");

  console.log(res);
  console.log("look-------------------------")
  mongoose.connection.close("mongodb://localhost:27017/mongo") .then(() => console.log("MongoDB Disconnected"))
  .catch((err) => console.log(err));

}

find();
