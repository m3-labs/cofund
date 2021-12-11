//rinkeby addresses - change if using a different network
require("ethers");

//kovan addresses
// const host = '0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3';
// const cfa = '0xECa8056809e7e8db04A8fF6e4E82cD889a46FE2F';
// const fDAIx = '0xe3CB950Cb164a31C66e32c320A800D477019DCFF';

//Goerli addresses
// const host = '0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9';
// const cfa = '0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8';
// const fDAIx = '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00';

//Rinkeby network
const host = '0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6';
const cfa = '0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A';
const fDAIx = '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90';

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  console.log(deployer);

  const nft = await deploy("CoFund", {
    from: deployer,
    args: ["DAO CoFund", 'COFUND', host, cfa, fDAIx],
    log: true,
  })
  await nft.deployTransaction?.wait()
  nftAddress = nft.address
  console.log("CoFund address:", nftAddress)

};
module.exports.tags = ["CoFund"];
