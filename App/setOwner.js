// This script, makes an Aragon agent an owner of the CoFund smart contract
// this needs to be called on a local machine as follows: 
// npx hardhat run scripts/setOwner.js

const hre = require("hardhat");
require("dotenv");
const Web3 = require("web3");
const ethers = require("ethers");

// We deployed on the Rinkeby network
const hostAddress = '0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6';
const cfaAddress = '0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A';
const fDAIx = '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90';


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


//address _receiver is the one that gets the fund
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

  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ALCHEMY_URL));
  const CoFund = await new web3.eth.Contract(CoFundABI, CoFundAddress);
  const nonce = await web3.eth.getTransactionCount(_sender, 'latest'); // nonce starts counting from 0

  // If the Aragon Agent be the owner of the contract, it can call setFixedFund and issueNFT (streaming fund), etc
  // TODO: create organization and copy the aragon agent address: 0x5322E02231B6CB4713Ff93889Bbb6966f0b07863
  const txData = (await CoFund.methods.transferOwnership("0x5322E02231B6CB4713Ff93889Bbb6966f0b07863")).encodeABI() 

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