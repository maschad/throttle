import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { transfer } from "../../core/actions/transfer";
import { getWallet } from "../../core/actions/getWallet";

const transferToolSchema = z.object({
	to: z.string().describe("The address to transfer to on the fuel network"),
	amount: z.number().describe("The amount of tokens to transfer on the fuel network"),
	asset: z.string().describe("The name of the token to transfer on the fuel network"),
	txParams: z.object({
		gasLimit: z.string().describe("The optional gas limit for the transfer on the fuel network"),
		maxFee: z.string().describe("The optional max fee for the transfer on the fuel network"),
	}).optional().describe("The transaction parameters for the transfer on the fuel network"),
});

export const transferTool = tool(async (input) => {
	const { to, amount, asset, txParams } = input;

	const wallet = await getWallet();

	let assetId = '';

	if (asset === 'ethereum') {
		assetId = '0x0000000000000000000000000000000000000000000000000000000000000000';
	} else {
		assetId = wallet.provider.getBaseAssetId()
	}

	return transfer({ wallet, to, amount, assetId, txParams });
}, {
	name: "transfer",
	description: "Transfer crypto tokens",
	schema: transferToolSchema,
});
