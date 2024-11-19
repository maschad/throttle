import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatAnthropic } from "@langchain/anthropic";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config';



const main = async () => {

	const systemTemplate = "Translate the following into {language}:";


	const model = new ChatAnthropic({
		model: "claude-3-5-sonnet-20240620",
		temperature: 0,
		apiKey: process.env.ANTHROPIC_API_KEY
	});

	const promptTemplate = ChatPromptTemplate.fromMessages([
		["system", systemTemplate],
		["user", "{text}"],
	]);

	const promptValue = await promptTemplate.invoke({
		language: "italian",
		text: "hi",
	});

	const messages = [
		new SystemMessage("Translate the following from English into Italian"),
		new HumanMessage("hi!"),
	];

	const parser = new StringOutputParser();


	const chain = model.pipe(parser);

	const llmChain = promptTemplate.pipe(model).pipe(parser);

	return await llmChain.invoke({ language: "italian", text: "hi" });
};

main().then(async (res) => {

	console.log('the response is:', res);
});
