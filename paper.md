# Cofund: a robust mechanism for funding DAO projects

## Intro

Decentralized governance (DeGov) is key to DAO operations and, as an increasing number of DAOs adopt and experiment with difference governance paradigms, some major challenges have emerged. In particular, with the increased sophistication of L2 protocols and applications there is an increased need for mechanisms to coordinate activities such as:

- Protocol improvements, R&D, and documentation
- Client development and layer n+1 dApp development
- Community development and outreach

Currently, most DAOs rely at least in part on independent *project workers* (PWs) that can be individuals or organizations. PWs are usually rewarded with salaries or grants that are either centrally decided or voted upon from the community. For example, the OceanDAO has a monthly grant cycle cadence where project proposal are voted on by the community. 

The typical project takes from one to a few months to deliver results. Some projects require substantial initial investments, such as hiring a new team member with a particular expertise or purchasing an asset. At the same time, there is uncertainty in the value of projects, which cannot be fully revealed at the time a project proposal is voted on (usually before the start of the project). This uncertainty leads to a problem: **big and potentially very valuable proposals often failing to receive enough votes** [Note: add examples from OceanDAO and others]. The current most popular solution is to split bigger proposals into a sequence of smaller ones. Sometimes this works well but it has its own problems:

- **Grant round fatigue:** going through a grant round involves a lot of preparation and discussion work. Splitting a 3 months project into 3 proposals (one a month) instead of one proposal at the beginning adds overhead work to the PW and takes focus away from the actual project. At the same time, this also increases the burden community voters.
- **Partial representation of the project:** sometimes the project value is not realized at the first milestone, but at the second or third. If the PW needs to split the project into small chunks, it may fail to gain enough support from the community to even get started. This also add uncertainty on the PW on whether they would get funded in the following rounds and decreases their ability to plan for the full project span.

We are going to propose a mechanism that solves this problems and it is a flexible framework for project funding with many other added benefits [Note: add links and expand explanation].

### Exhisting funding programs

A number of DAOs and communities in the blockchain space have implemented funding programs to finance projects on their platforms. We summarize here some of the most popular and their key features.
- Ocean DAO
    - Goal: fund projects with ROI > 1.
    - Resource Pool: fixed amount of already minted OCEAN token from the Ocean Protocol Fundation treasury.
    - Proposals: every month, teams submit project presentation and request a funding amount; proposals have tiers (first time projects lower amounts).
    - Funding mechanism
        - Decision: OCEAN token holders vote Y/N; 50%+ Y get funded.
        - Distribution: immediately.
        - Evaluation: stewards for checkpoint/help; at the end of the project.

## Cofund

The intent of cofund is to create a mechanism that makes project funding more flexible, enables the revelation of community preferences and value of the project after the voting is concluded, and it compatible with DAOs current operations and simple enough that can be adopted with little overhead.

### Proposals

There are `N` participants (the PWs) that submit proposals to get assigned resources from a common resource pool `R`. Each proposal contains a resource request `r` that has a **total request amunt** for the project divided in two-parts:

- a **fixed part** to be paid immediately in full
- a **dynamic part** to be streamed and an associated target rate (alternatively target period)

Example 1:
- OceanDAO Grant Round 42
    - $250k funds available
    - 20 participants
- Project A proposal requests $12k
    - $6k to be paid immediately
    - $6k to be streamed at the target rate of $200/day

If the project is selected, this two-part funding mechanism gives the initial funding to get started immediately while allowing for preference and value discovery after the project starts. Let's consider now a more realistic examples with multiple projects competing in the funding round.

Example 2:
- Grant Round with $100k funds and 3 proposals

| Proposal | Total request | Fixed | Rate |
| - | - | - | - |
| Prop A | $60k | $30k | $1000/day |
| Prop B | $40k | $28k | $200/day |
| Prop C | $30k | $20k | $333/day |

It remains to be specified how the target rate will be selected and updated, but a few options come to mind: (1) using ideas from exhisting mechanisms (eg, conviction voting/osmotic funding); (2) making it proportional to the consensus received (ie, a project that receives 100%-yes votes gets funded at full target rate, a project that receives 51%-yes votes at lower rate); (3) adding intermediate checkpoint perhaps with community stewards or community review; etc.

### Funding Mechanism

#### Voting mechanism and initial funds

*Lorem ipsum*

#### Checkpoints and target funds update

*Lorem ipsum*

## Implementation

There are a few exhisting apps in the DeGov space that we can leverage. General purpose voting apps like [Snapshot](https://docs.snapshot.org/) and Aragon Voting App are too generic; [1Hive's conviction voting app](https://github.com/1Hive/conviction-voting-app) is a customized implementation of a particular voting mechanism for funding 1Hive's projects; Giveth has very interesting feature like [milestone reporting](https://medium.com/giveth/coming-soon-milestone-reporting-a-mechanism-for-built-in-accountability-d2de06310ee4), however it is focused on philantropic giving and not strategic project funding. 

Our goal is to build an app that implements the Cofund mechanism and superpowers project funding and governance for DAOs.

### Components
There are two main components: user experience and backend contracts. Here are our guiding principles for their development:
- User experience
    - Voters interface
        - Clear voting mechanics: how they can vote and how their votes are converted into funding
    - PWs interface
        - Clear funding mechanics: how to specify initial request and checkpoints; usable: specify flow rates in day (the conversion to per-second rates is in the backend)
    - Review mechanism interface
        - Clear deposit mechanics: how funds are deposited and unlocked upon funding events (initial funding/checkpoints)
        - Clear checkpoint controls
- Backend contracts
    - Trade-off between onchain/offchain operations (eg, voting offchain and funding onchain? everything onchain? what about checkpoints and flow rate updates?)

### Roadmap

#### MVP
For the MVP we will focus on two components that are core to the cofund idea:
- Backend contract to setup payment stream: a Superfluid Constant Flow Agreement (CPA).
    - Test case:
        - Proposals A and B in Example 2 above win the round and get fully funded.
        - Setup 2 CFAs, one for each proposal, to manage the streaming part of the funding with the rates specified in the examples.
        - Imput streaming rate; monitor streaming progress; ability to change streaming rate at some later point in the future (checkpoint).
- Review mechanism interface: UI that shows ongoing projects, current funding status, and allows to change the flow rate of the streamed payment.


#### Next steps
*Lorem ipsum*

## Resources
- [BC funding survey by Ocean Protocol](https://blog.oceanprotocol.com/web3-sustainability-i-survey-of-ecosystem-funding-programs-ffa2bb235df5)
    - "Economic sustainability is the key for any Web3 project to survive and thrive. It is the equivalent of financial viability and good business model for Web2-type businesses. Most Web3 projects rely on funding to foster a sustainable ecosystem, which is often administered by the community (foundation or DAO)."
    - "Grants pose a challenge: what if the recipient does not complete what it aimed to do? The money has already been granted. So, often, little can be done on those particular funds. But there is a side effect: that recipient will have difficulty getting future grants. So while grants do not have an explicit mechanism for poor results, reputation turns this from a short-term game to a long-term game. However, it’s still unfortunate that the initial grant money was spent (and lost)."
- [Quadratic funding paper from BHW](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3243656)
- Conviction voting
    - [A brief history of conviction voting - blog post](https://michaelzargham.medium.com/a-brief-history-of-conviction-voting-ad4ca4eb4aee)
    - [Commons Stack's conviction voting guide](https://medium.com/commonsstack/conviction-voting-a-novel-continuous-decision-making-alternative-to-governance-62e215ad2b3d)
    - [Zargham's sensor fusion - paper](https://github.com/BlockScience/conviction/blob/master/social-sensorfusion.pdf)
    - [Conviction voting formalization - notebook](https://nbviewer.org/github/BlockScience/Aragon_Conviction_Voting/blob/master/algorithm_overview.ipynb)
    - [Conviction voting simulations](https://github.com/1Hive/conviction-voting-cadcad/blob/master/README.md)
- New governance mechanisms
    - [Computer aided governance of gitcoin grants - blog post](https://medium.com/block-science/towards-computer-aided-governance-of-gitcoin-grants-730de7bcdbef)
    - [Commitment voting - paper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3742435)