import { DeployFunction } from 'hardhat-deploy/types';
import { Ship } from '../utils';
import { Greeter__factory } from '../types';

const func: DeployFunction = async (hre) => {
	const { deploy } = await Ship.init(hre);
	await deploy(Greeter__factory, {
		args: ['hi'],
	});
};

export default func;
func.tags = ['greeter'];
