import { WalletUnlocked } from 'fuels';

export const getWalletInfo = async (args: {
	wallet: WalletUnlocked;
}) => {
	const { wallet } = args;

	const balancesResponse = await wallet.getBalances();

	const formattedBalances = balancesResponse.balances.map((balance) => {
		return `Asset ID: ${balance.assetId}\nBalance: ${balance.amount}`;
	});

	return `Balances for wallet ${wallet.address.toString()}:\n${formattedBalances.join('\n')}`;
};
