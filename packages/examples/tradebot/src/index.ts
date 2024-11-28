import { ChatAnthropic } from "@langchain/anthropic";
import getUserInput from "./cli";
import { transferTool } from "../../../langchain/tools/transfer";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";


import 'dotenv/config';

process.removeAllListeners('warning');

const main = async () => {

	const agent = await intiliazeAgent();

	while (true) {
		const userInput = await getUserInput();

		// Check for exit command
		if (userInput.toLowerCase() === 'exit') {
			console.log('Goodbye!');
			process.exit(0);
		}

		const inputs = { messages: [{ role: 'user', content: userInput }] };


		let config = { configurable: { thread_id: "1" } };
		let stream = await agent.stream(inputs, {
			...config,
			streamMode: "values",
		});

		for await (
			const { messages } of stream
		) {
			let msg = messages[messages?.length - 1];
			if (msg?.content) {
				console.log(msg.content);
			} else if (msg?.tool_calls?.length > 0) {
				console.log(msg.tool_calls);
			} else {
				console.log(msg);
			}
			console.log("-----\n");
		}
	}
}

const intiliazeAgent = async () => {
	// Initialize LLM
	const model = new ChatAnthropic({
		model: "claude-3-5-sonnet-20240620",
		temperature: 0,
		apiKey: process.env.ANTHROPIC_API_KEY
	});

	// memory
	const memory = new MemorySaver();

	// Bind the agent to the tool node
	const agent = createReactAgent({ llm: model, tools: [transferTool], checkpointSaver: memory });

	return agent;
};



main().then(async (res) => {

	// Handle Ctrl+C gracefully
	process.on('SIGTERM', () => {
		console.log('\nGoodbye!');
		process.exit(0);
	});

	console.log(res);
});
