import { WalletUnlocked, TxParamsType, FuelError, TransactionStatus, ErrorCode } from 'fuels';

export type TransferInput = {
	wallet: WalletUnlocked;
	assetId: string;
	to: string;
	amount: number;
	txParams?: TxParamsType;
};

export const transfer = async (args: TransferInput): Promise<string> => {
	const { amount, assetId, to, txParams } = args;
	const tx = await args.wallet.transfer(to, amount, assetId, txParams);

	const result = await tx.waitForResult();

	if (result.status === TransactionStatus.success) {
		return `Transferred ${amount} of ${assetId} to ${to}.\nTransaction hash for the transfer: ${result.id} \n Here's the link for the transfer: https://app.fuel.network/tx/${result.id}`;
	}

	throw new FuelError(ErrorCode.TRANSACTION_FAILED, `Transaction failed: ${result.id}`, {
		transactionId: result.id,
		receipts: result.receipts,
	});
};
