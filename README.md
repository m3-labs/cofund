<img src="https://user-images.githubusercontent.com/7682268/144949810-313d0ccf-6355-4a8c-9590-05c4e6deb35c.png" width="180" height="180">

# Cofund

Vote, Fund, Deliver.

# Table of content

- [Cofund](#cofund)
- [Table of content](#table-of-content)
- [Submission](#submission)
- [Quick Start](#quick-start)
  - [Config `.env` file](#config-env-file)
  - [Deploy CoFund conteract to Rinkeby](#deploy-cofund-conteract-to-rinkeby)
  - [Transfer Ownership of the CoFund to Aragon client](#transfer-ownership-of-the-cofund-to-aragon-client)
  - [Interact with Superfulid via voting on Aragon](#interact-with-superfulid-via-voting-on-aragon)

# Submission

This repo contains the smart contracts for the prototype of the system that we built in the DAO Global Hackathon. XXX

The whitepaper in `paper.md` contains an extended practical relevance explanation toghether with more details on future development goals.

Links for the pitch deck and the video with the demo for the submission:
- XXX
- XXX


# Quick Start

Clone this repository by typing the following command:
`git clone https://github.com/m3-labs/cofund.git`

Then,  go to the implementation folder:
`
cd Implementation
yarn install
`
 
## Config `.env` file
copy the `.env.template` file and change the name to `.env`. The format of the file is as follows:

```
ALCHEMY_URL= https://eth-rinkeby.alchemyapi.io/v2/xxxxxxxxxxx
PK= xxxxxxx
RECEIVER_PK= xxxxx
ETHERSCAN_API_KEY= xxxxxx
```

- Go to the [Alchemy.io](https://dashboard.alchemyapi.io/) and create create an App and copy the HTTP URL from the VIEW KEY. You will need it to paste it in the `.env` file. In this work, we used Rinkeby testnet.
- PK is the private key of the metamask account.
- RECEIVER_PK: private key of the reveive of the fix or stream fund.
- ETHERSCAN_API_KEY: go to https://etherscan.io/apis and create a private key.


## Deploy CoFund conteract to Rinkeby


## Transfer Ownership of the CoFund to Aragon client

## Interact with Superfulid via voting on Aragon


