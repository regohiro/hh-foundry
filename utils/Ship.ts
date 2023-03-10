import hardhatRuntimeEnvironment, { ethers } from 'hardhat';
import { ContractFactory, Signer } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployOptions } from 'hardhat-deploy/types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

type Modify<T, R> = Omit<T, keyof R> & R;
type DeployParam<T extends ContractFactory> = Parameters<InstanceType<{ new (): T }>['deploy']>;
type ContractInstance<T extends ContractFactory> = ReturnType<InstanceType<{ new (): T }>['attach']>;

export interface Accounts {
	[name: string]: SignerWithAddress;
}

class Ship {
	public accounts: Accounts;
	public users: SignerWithAddress[];
	public hre: HardhatRuntimeEnvironment;
	private log: boolean | undefined;

	constructor(hre: HardhatRuntimeEnvironment, accounts: Accounts, users: SignerWithAddress[], log?: boolean) {
		this.hre = hre;
		this.log = log;
		this.users = users;
		this.accounts = accounts;
	}

	static init = async (hre: HardhatRuntimeEnvironment = hardhatRuntimeEnvironment, log?: boolean): Promise<Ship> => {
		const namedAccounts = await hre.getNamedAccounts();
		const accounts: Accounts = {};
		const users: SignerWithAddress[] = [];
		for (const [name, address] of Object.entries(namedAccounts)) {
			const signer = await ethers.getSigner(address);
			accounts[name] = signer;
			users.push(signer);
		}
		const unnammedAccounts = await hre.getUnnamedAccounts();
		for (const address of unnammedAccounts) {
			const signer = await ethers.getSigner(address);
			users.push(signer);
		}
		const ship = new Ship(hre, accounts, users, log);
		return ship;
	};

	get addresses(): string[] {
		const addresses: string[] = [];
		for (const [, user] of Object.entries(this.users)) {
			addresses.push(user.address);
		}
		return addresses;
	}

	get provider() {
		return this.hre.ethers.provider;
	}

	deploy = async <T extends ContractFactory>(
		contractFactory: new () => T,
		option?: Modify<
			DeployOptions,
			{
				from?: SignerWithAddress;
				args?: DeployParam<T>;
				log?: boolean;
			}
		>
	) => {
		const contractName = contractFactory.name.split('__')[0];
		const from = option?.from || this.users[0];
		const fromAddr = from.address;

		const log = option?.log || this.log || this.hre.network.name !== 'hardhat' ? true : false;
		const deployResult = await this.hre.deployments.deploy(contractName, {
			...option,
			from: fromAddr,
			args: option?.args,
			log,
		});

		const contract = (await ethers.getContractAt(contractName, deployResult.address, from)) as ContractInstance<T>;

		return {
			contract,
			...deployResult,
		};
	};

	connect = async <T extends ContractFactory>(
		contractFactory: new () => T,
		newAddress?: string | boolean,
		signer?: Signer
	): Promise<ContractInstance<T>> => {
		const contractName = contractFactory.name.split('__')[0];
		if (typeof newAddress === 'string') {
			const factory = (await ethers.getContractFactory(contractName, signer || this.users[0])) as T;
			return factory.attach(newAddress) as ContractInstance<T>;
		} else {
			return (await ethers.getContract(contractName, signer || this.users[0])) as ContractInstance<T>;
		}
	};
}

export default Ship;
