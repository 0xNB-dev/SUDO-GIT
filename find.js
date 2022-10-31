const mongoose = require("mongoose");
const {Pair } = require( "./db.js")

console.log("look-------------------------")


async function find() {
  const res = await Pair.find({
    nft: "0x2C88aA0956bC9813505d73575f653F69ADa60923"
  }, "addr");

  console.log(res);
  console.log("look-------------------------")
  mongoose.connection.close("mongodb://localhost:27017/mongo") .then(() => console.log("MongoDB Disconnected"))
  .catch((err) => console.log(err));

}

find();
