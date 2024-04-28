require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/Vu5n9Sl2sQEO0STeRdAB2iCxcSUoGRIC',
      accounts:[process.env.PRIVATE_KEY],
    }
   
  }
};
