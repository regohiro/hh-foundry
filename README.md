## Version

**1.0.0**

## Setting up local development

### Pre-requisites

- [Node.js](https://nodejs.org/en/) version 14.0+ and [yarn](https://yarnpkg.com/) for Javascript environment.
- [Foundry](https://github.com/gakonst/foundry#installation) for running forge tests.

1. Clone this repository

```bash
git clone --recursive https://github.com/regohiro/hh-foundry
```

2. Install dependencies

```bash
yarn
```

3. Set environment variables on the .env file according to .env.example

```bash
cp .env.example .env
vim .env
```

4. Compile Solidity programs to generate bytecodes, ABIs, and typings

```bash
yarn compile
```

### Development

- To run tests

```bash
forge test
```

- To run scripts on Goerli test

```bash
yarn script:goerli ./scripts/....
```

- To run deploy contracts on Goerli testnet (uses Hardhat deploy)

```bash
yarn deploy:goerli --tags ....
```

- To verify contracts on etherscan

```bash
yarn verify:goerli MyTokenContract,MyNFTContract
```

- To verify all contracts using hardhat-deploy
```bash
yarn hardhat etherscan-verify --network mainnet
```

... see more useful commands in package.json file

## Main Dependencies

Contracts are developed using well-known open-source software for utility libraries and developement tools. You can read more about each of them.

[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)

[Solmate](https://github.com/transmissions11/solmate)

[Hardhat](https://github.com/nomiclabs/hardhat)

[hardhat-deploy](https://github.com/wighawag/hardhat-deploy)

[foundry](https://github.com/gakonst/foundry)

[ethers.js](https://github.com/ethers-io/ethers.js/)

[TypeChain](https://github.com/dethcrypto/TypeChain)
