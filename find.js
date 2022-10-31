const mongoose = require("mongoose");
const {Pair } = require( "./db.js")


async function find() {
  const res = await Pair.find({
    nft: "NFT_ADDRESS"
  }, "addr");

  console.log(res);
  mongoose.connection.close("mongodb://localhost:27017/mongo") .then(() => console.log("MongoDB Disconnected"))
  .catch((err) => console.log(err));

}

find();
