const { ethers } = require("ethers");
const { Interface } = require("ethers/lib/utils");
const fs = require("fs");
const { providers } = require("@0xsequence/multicall");

const interface1 = new Interface(["event NewPair (address poolAddress)"]);
const abi = ["function nft() public view returns (address _nft)"];
const hexToDecimal = (hex) => parseInt(hex, 16);

async function Create_Index() {
  const provider = new ethers.providers.AlchemyProvider(
    "homestead",
    "API_KEY"
  );
  // Second provider to use only for batch requests
  const provider1 = new providers.MulticallProvider(
    new ethers.providers.AlchemyProvider(
      "homestead",
      "API_KEY"
    )
  );

  const addr = "0xb16c1342E617A5B6E4b631EB114483FDB289c0A4";
  const addr1 = "0x16F71D593bc6446a16eF84551cF8D76ff5973db1";
  const Factory = new ethers.Contract(addr, interface1, provider);
  var events = [];
  var first_block = 14645816; // SudoSwap Factory deployment's block
  var last_block = first_block;
  const final_block = await provider.getBlockNumber();

  //Getting all the "new pair" events in minimal amount of API calls
  while (first_block <= final_block) {
    try {
      // Ment to fail every call until the last one
      if (
        events.push(
          (res = await Factory.queryFilter("NewPair", last_block, final_block))
        )
      ) {
        console.log("-------------------------------------------------------");
        console.log(
          `fetching data from block ${last_block} to block ${final_block} ...`
        );
        console.log("-------------------------------------------------------");
        break;
      }

      // Using the server error response of Alchemy to determine exactly the block range for the maximal amount of 10K logs
    } catch (e) {
      const text = `${e}`;
      console.log("-------------------------------------------------------");
      //Hard coded basic text slicing with conversion from hex string to decimal
      first_block = hexToDecimal(text.slice(397, 405));
      last_block = hexToDecimal(text.slice(407, 415));
      console.log(
        `fetching data from block ${first_block} to block ${last_block} ...`
      );

      events.push(
        await Factory.queryFilter("NewPair", first_block, last_block)
      );
    }
  }
  events = events.flat();

  var calls = [];
  //Building array of contract call promieses
  for (i = 0; i < events.length; i++) {
    const Pair = new ethers.Contract(
      events[i].args.poolAddress,
      abi,
      provider1
    ).nft();
    calls.push(Pair);
  }
  console.log("Fetching collections data ...");

  //Using Multicall
  var res = await Promise.all(calls);
  var final = [];

  for (i = 0; i < events.length; i++) {
    final.push({ addr: events[i].args.poolAddress, nft: res[i] });
  }
  const t = JSON.stringify(final);
  fs.writeFile("Pairs.json", t, function (err, result) {
    if (err) console.log("error", err);
  });
  console.log("Finished");
}
Create_Index();
