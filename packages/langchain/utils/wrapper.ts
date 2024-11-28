
import { WalletUnlocked } from 'fuels';
import * as actions from '@fuels-ts/throttle-core';

export const instructionParser = async (instruction: string, args: any) => {
	if (!instruction || instruction === '') {
		throw new Error('Instruction is required')
	} else {

	}

}

export const runAction = async (wallet: WalletUnlocked, apiKey: string, network: string) => {

}