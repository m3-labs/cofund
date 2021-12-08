// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
//isse an NFT

const hre = require("hardhat");
require("dotenv");
const Web3 = require("web3");
const ethers = require("ethers");

// kovan
// const hostAddress = '0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3';
// const cfaAddress = '0xECa8056809e7e8db04A8fF6e4E82cD889a46FE2F';
// const fDAIx = '0xe3CB950Cb164a31C66e32c320A800D477019DCFF';

//goerli network
// const hostAddress = '0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9';
// const cfaAddress = '0xEd6BcbF6907D4feEEe8a8875543249bEa9D308E8';
// const fDAIx = '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00';

//Rinkeby network
const hostAddress = '0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6';
const cfaAddress = '0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A';
const fDAIx = '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90';


//all addresses hardcoded for kovan
const hostJSON = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol/ISuperfluid.json")
const hostABI = hostJSON.abi;

const cfaJSON = require("../artifacts/@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol/IConstantFlowAgreementV1.json")
const cfaABI = cfaJSON.abi;

const CoFundJSON = require("../artifacts/contracts/CoFund.sol/CoFund.json");
const CoFundABI = CoFundJSON.abi; 

//temporarily hardcode contract address and sender address
//need to manually enter contract address and sender address here
const deployedCoFund = require("../deployments/goerli/CoFund.json");
const CoFundAddress = deployedCoFund.address;


//address of owner of option here..need to change this
const _receiver = "0x358577610ebc5b1f7Dc1704ccC03C8062AA64534";
const _sender = "0xA9A382Ed47cb13a3B993352DE7624BEBF371fd86";
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // 0x5FbDB2315678afecb367f032d93F642f64180aa3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ALCHEMY_URL));
  const CoFund = await new web3.eth.Contract(CoFundABI, CoFundAddress);
  const nonce = await web3.eth.getTransactionCount(_sender, 'latest'); // nonce starts counting from 0


  const txData = (await CoFund.methods.setFixedFund( 2000)).encodeABI() //send 2000

  //send the tx to the contract
  let tx = {
    'to': CoFundAddress,
    'gas': 3000000,
    'nonce': nonce,
    'data': txData
  }

  let signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PK);

  await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });