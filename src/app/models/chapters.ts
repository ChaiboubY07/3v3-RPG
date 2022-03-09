import { Hero } from "./characters";

export enum CharacterAction{
    attack = "Attack",
    sneak = "Sneak",
    persuade = "Persuade",
    doNothing = "Do Nothing"
}

export enum FailureOptions {
	gameOver,
	nextChapter
}

export enum SuccessOptions {
	rewardExperience,
	rewardEquipment,
	addHeroToParty
}

export class Chapter {
	story: string[] = [];
	options: CharacterAction[] = [];
	enemyParty: Hero[] = [];
	ifFail: FailureOptions = 0;
	ifSucceed: SuccessOptions[] = [];

}
