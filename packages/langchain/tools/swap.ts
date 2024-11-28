import { z } from "zod";
import { StructuredToolParams } from "@langchain/core/tools";

const swapToolSchema: StructuredToolParams = {
	name: "swap",
	description: "Swap tokens",
	schema: z.object({
		from: z.string().describe("The token to swap from"),
		to: z.string().describe("The token to swap to"),
		amount: z.string().describe("The amount of tokens to swap"),
		deadline: z.string().describe("The deadline for the swap"),
		pools: z.array(z.string()).describe("The pools to use for the swap"),
	}),
};