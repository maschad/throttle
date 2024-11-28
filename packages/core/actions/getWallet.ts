import { Provider, Wallet } from 'fuels';

export const getWallet = async () => {
	const privateKey = process.env.WALLET_PRIVATE_KEY;

	const provider = await Provider.create('https://testnet.fuel.network/v1/graphql');


	if (!privateKey) {
		throw new Error('WALLET_PRIVATE_KEY environment variable is not set');
	}

	return Wallet.fromPrivateKey(privateKey, provider);
};
