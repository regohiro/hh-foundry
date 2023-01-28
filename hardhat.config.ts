import 'hardhat-deploy';
import 'dotenv/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-foundry';
import { HardhatUserConfig } from 'hardhat/types';

import './tasks/account';
import './tasks/verify';
import { node_url, accounts, verifyKey } from './utils/network';

const config: HardhatUserConfig = {
	defaultNetwork: 'hardhat',
	networks: {
		hardhat: {
			chainId: 1337,
			forking: {
				enabled: process.env.FORKING_ENABLED === 'true',
				blockNumber: Number(process.env.FORKING_BLOCK_NUM) || undefined,
				url: node_url('mainnet'),
			},
			accounts: accounts('localhost'),
			mining: {
				auto: process.env.AUTO_MINING_DISABLED !== 'true',
				interval: process.env.MINING_INTERVAL ? Number(process.env.MINING_INTERVAL) : undefined,
			},
			tags: ['hh'],
		},
		localhost: {
			url: node_url('localhost'),
			accounts: accounts('localhost'),
			tags: ['local', 'localhost'],
		},
		goerli: {
			url: node_url('goerli'),
			accounts: accounts('goerli'),
			tags: ['test', 'goerli'],
		},
		mainnet: {
			url: node_url('mainnet'),
			accounts: accounts('mainnet'),
			tags: ['prod', 'mainnet'],
		},
	},
	etherscan: {
		apiKey: {
			mainnet: verifyKey('etherscan'),
			goerli: verifyKey('etherscan'),
		},
	},
	solidity: {
		compilers: [
			{
				version: '0.8.17',
				settings: {
					optimizer: {
						enabled: true,
						runs: Number(process.env.OPTIMIZER_RUNS || 200),
					},
					outputSelection: {
						'*': {
							'*': ['storageLayout'],
						},
					},
				},
			},
		],
	},
	namedAccounts: {
		deployer: 0,
	},
	paths: {
		artifacts: './artifacts',
		cache: './hh-cache',
		sources: './src',
		tests: './test',
	},
	typechain: {
		outDir: 'types',
		target: 'ethers-v5',
	},
	mocha: {
		timeout: 30000,
	},
	gasReporter: {
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		currency: 'USD',
		enabled: process.env.REPORT_GAS === 'true',
		src: './src',
	},
};

export default config;
