import { Provider, Wallet } from 'fuels';


const provider = await Provider.create(LOCAL_NETWORK_URL);


export const transfer = async (args: {
	from: string;
	to: string;
	amount: number;
}) => {
	const wallet = Wallet.fromPrivateKey(args.from, provider);

	wallet.transfer(args.to, args.amount, provider.getBaseAssetId());
};
