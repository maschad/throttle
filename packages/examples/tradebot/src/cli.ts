
import inquirer from "inquirer";

const getUserInput = async (aiResponse: string = 'What do you want to do? (type exit to quit)'): Promise<string> => {
	const { userInput } = await inquirer.prompt([
		{
			type: 'input',
			name: 'userInput',
			message: `> ${aiResponse}`,
		},
	]);
	return userInput;
};

export default getUserInput;
