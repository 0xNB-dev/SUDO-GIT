const fs = require("fs");
const mongoose = require("mongoose");
const {Pair } = require( "./db.js")
async function create() {

  Pair.collection.drop();
  const pairs = JSON.parse(fs.readFileSync("Pairs.json", "utf-8"));
  await Pair.insertMany(pairs);
  console.log(await Pair.find({}));
  mongoose.connection.close("mongodb://localhost:27017/mongo");
}

create();
