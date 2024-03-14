require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/Vu5n9Sl2sQEO0STeRdAB2iCxcSUoGRIC',
      accounts:['4eb8fbc278259ad96ad7dd280611d9654aa251cff66b12bfde91dfccd294ef79'],
    }
   
  }
};
