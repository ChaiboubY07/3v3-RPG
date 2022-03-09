import { RaceOptions, WeaponOptions } from "./character-options";


export enum FightOptions{
    attack = "Attack",
    specialAttack = "Special Attack",
    none = "None"
}

export const ExperienceToLevel = [
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000
];

export class BaseCharacter {
    name: string;
    maxHealth: number;
    currentHealth: number;
    isIncapacitated: boolean;
    attack : number;
    equippedWeapon: string;


    constructor(name:string,health:number,attack:number,equippedWeapon:string)
    {
        this.name = name;
        this.maxHealth = health;
        this.currentHealth = health;
        this.isIncapacitated = false;
        this.attack = 0;
        this.equippedWeapon = "";

    }

    dealDamage(){
        return this.attack;
    }
}

export class Hero extends BaseCharacter {
	race: string = "";
	experience: number;
	level: number;
	availableSkillPoints: number;
	turnsUntilSpecialAvailableAgain: number = 2;
    url: String="";

    constructor(name:string,level:number,health:number,attack:number,equippedWeapon:string){
		super(name, health, attack,equippedWeapon);

		this.experience = 0;
		this.level = level;
		this.availableSkillPoints = 0;					// if not initialize to 0, then the game doesn't know what the type is the variable
	}

	levelUp(): void {
		this.experience -= ExperienceToLevel[this.level];	// index, so [] not ()
		this.level++;
		this.availableSkillPoints += 8;
		if (this.experience >= ExperienceToLevel[this.level]) {
			this.levelUp();
		}
	}


	rest(): void {
		this.currentHealth = this.maxHealth;
		this.isIncapacitated = false;
		this.turnsUntilSpecialAvailableAgain = 0;
	}


}

export class Human extends Hero {
    spriteUrl: String;
    constructor(name:string,level:number,health:number,attack:number,equippedWeapon:string){
		super(name, level, health, attack, equippedWeapon);
		this.race = RaceOptions.human;
		this.attack += 5;
        this.spriteUrl = "../../assets/hero1.png"
        this.url = this.spriteUrl;
	}

	// override the levelUp()
	override levelUp(): void {
		this.maxHealth += Math.floor(Math.random() * 5) + 7;	// increase 7~12 to health
		this.currentHealth = this.maxHealth;					// reset their health
		super.levelUp();										// go through the experience and level counter
	}
}

export class Elf extends Hero {
    spriteUrl: String;
    constructor(name:string,level:number,health:number,attack:number,equippedWeapon:string){
		super(name, level, health, attack, equippedWeapon);
		this.race = RaceOptions.elf;
		this.attack += 5;
        this.spriteUrl = "../../assets/hero2.png"
        this.url = this.spriteUrl;
	}

	// override the levelUp()
	override levelUp(): void {
		this.maxHealth += Math.floor(Math.random() * 5) + 7;	// increase 7~12 to health
		this.currentHealth = this.maxHealth;					// reset their health
		super.levelUp();										// go through the experience and level counter
	}
}
export class Halfling extends Hero {
    spriteUrl: String;
    constructor(name:string,level:number,health:number,attack:number,equippedWeapon:string){
		super(name, level, health, attack, equippedWeapon);
		this.race = RaceOptions.halfling;
		this.attack += 5;
        this.spriteUrl = "../../assets/hero.png"
        this.url = this.spriteUrl;
	}

	// override the levelUp()
	override levelUp(): void {
		this.maxHealth += Math.floor(Math.random() * 5) + 7;	// increase 7~12 to health
		this.currentHealth = this.maxHealth;					// reset their health
		super.levelUp();										// go through the experience and level counter
	}
}
export class Dwarf extends Hero {
    spriteUrl: String;
    constructor(name:string,level:number,health:number,attack:number,equippedWeapon:string){
		super(name, level, health, attack, equippedWeapon);
		this.race = RaceOptions.dwarf;
		this.attack += 5;
        this.spriteUrl = "../../assets/hero.png"
        this.url = this.spriteUrl;
	}

	// override the levelUp()
	override levelUp(): void {
		this.maxHealth += Math.floor(Math.random() * 5) + 7;	// increase 7~12 to health
		this.currentHealth = this.maxHealth;					// reset their health
		super.levelUp();										// go through the experience and level counter
	}
}

export const checkRace = (hero: Hero) => {
	switch (hero.race) {
		case RaceOptions.human:
			hero.attack += 5;
			break;
		case RaceOptions.elf:
            hero.attack += 2;
			break;
		case RaceOptions.dwarf:
			hero.attack += 3;
			break;
		case RaceOptions.halfling:
			hero.attack += 1;
			break;
	}
};