import inquirer from "inquirer";

const getUserInput = async (aiResponse: string = 'What do you want to do? (type exit to quit)'): Promise<string> => {
	try {
		const { userInput } = await inquirer.prompt([
			{
				type: 'input',
				name: 'userInput',
				message: `> ${aiResponse}`,
			},
		]);
		return userInput;
	} catch (error) {
		// Handle CTRL+C gracefully
		console.log('\nGoodbye!'); // Optional: Add a friendly exit message
		process.exit(0); // Exit cleanly
	}
};

export default getUserInput;
