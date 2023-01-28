import { Greeter__factory } from '../types';
import { Ship } from '../utils';

const main = async () => {
	const { connect } = await Ship.init();
	const greeter = await connect(Greeter__factory);
	const res = await greeter.greet();
	console.log(res);
};

main()
	.then(() => process.exit(0))
	.catch((err: Error) => {
		console.error(err);
		process.exit(1);
	});
