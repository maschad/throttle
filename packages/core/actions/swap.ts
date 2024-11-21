import { MiraAmm, PoolId, ReadonlyMiraAmm } from "mira-dex-ts";
import { AssetId, ErrorCode, FuelError, TransactionStatus, TxParams, WalletUnlocked } from "fuels";

// For transaction-based operations
export const swap = async (args: {
	wallet: WalletUnlocked;
	amountIn: number;
	assetIn: AssetId;
	assetInName: string;
	amountOutMin: number;
	assetOut: AssetId;
	assetOutName: string;
	pools: PoolId[];
	deadline: number;
	txParams: TxParams;
}) => {
	const { wallet, amountIn, assetIn, assetInName, amountOutMin, assetOut, assetOutName, pools, deadline, txParams } = args;

	const miraAmm = new MiraAmm(wallet);

	const txRequest = await miraAmm.swapExactInput(
		amountIn, assetIn, amountOutMin, pools, deadline, txParams
	);

	// Estimate the transaction cost and fund accordingly
	const txCost = await wallet.getTransactionCost(txRequest);
	txRequest.gasLimit = txCost.gasUsed;
	txRequest.maxFee = txCost.maxFee;

	await wallet.fund(txRequest, txCost);

	const result = await wallet.sendTransaction(txRequest);

	const txn = await result.waitForResult();

	if (txn.status === TransactionStatus.success) {
		return `Traded ${amountIn} of ${assetInName} for ${amountOutMin} ${assetOutName}.\nTransaction hash for the trade: ${txn.id} \nTransaction link for the trade: Here's the link for the transfer: https://app.fuel.network/tx/${result.id}`;
	}

	throw new FuelError(ErrorCode.TRANSACTION_FAILED, `Transaction failed: ${result.id}`, {
		transactionId: result.id,
		receipts: txn.receipts,
	});
};
