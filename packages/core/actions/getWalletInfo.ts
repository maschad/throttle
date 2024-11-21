
import { WalletUnlocked } from 'fuels';

export const getWalletInfo = async (args: {
	wallet: WalletUnlocked;
}) => {
	const { wallet } = args;

	return `Wallet: ${wallet.address.toString()} on network: ${wallet.provider.getChain().name}`;
};
