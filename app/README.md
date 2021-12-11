# DAO CoFund

Make sure you have installed [Node](https://nodejs.org/en/download/), [Yarn](https://classic.yarnpkg.com/en/docs/install), and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
Add your own RPC URL for the Rinkeby testnet and your own private keys for testing in your own `.env` file by copying `.env.template` .

1) Run ```yarn install``` to install dependencies.
2) Run ```yarn deploy:reset``` to deploy a new instance of the contract and run ```yarn verify``` to make Etherscan verify it.
3) Run ```yarn transfer``` to transfer the smart contract's ownership to the Aragon agent.


