import { Component } from '@angular/core';
import { GameControllerService } from 'src/app/services/game-controller.service';
import { Router } from '@angular/router';
import { BaseCharacter, Dwarf, Elf, FightOptions, Halfling, Hero, Human} from 'src/app/models/characters';

enum Teams {
	heroes,
	enemies,
	none
}

@Component({
    selector: "fight-component",
    templateUrl: "./fight.component.html",
    styleUrls: ["fight.component.css"]
})
export class FightComponent{
    constructor(private gameControllerService: GameControllerService,
        private router: Router){}

    heroTurn: boolean = true;
    actionDelay:number = this.gameControllerService.actionDelay;
    turnsBetweenSpecial: number = 2;
    characterIndex:number = 0;
    freezeActions:boolean = false;

    heroParty: Hero[] = this.gameControllerService.heroParty;
    heroesIncapacitated: number = 0;
    enemyParty: Hero[] = this.gameControllerService.enemyParty;
    enemiesIncapacitated: number = 0;

    currentCharacter: BaseCharacter = this.heroParty[this.characterIndex];
    _fightOptions: typeof FightOptions = FightOptions;
    _teams: typeof Teams = Teams;
    selectedAction: FightOptions = FightOptions.none;
    selectedTargets: BaseCharacter[]=[];

    displayMessage:string = "";//`${this.currentCharacter.name}'s turn...`;
    successMessages: string[]=[];
    availableTargets: Teams = Teams.none;
    showGameOverButton: boolean = false;

    selectOption(selectOption: FightOptions) {
		if (this.freezeActions && this.heroTurn) {
			return;
		}
		this.selectedAction = selectOption;
		this.selectedTargets = [];

		if (this.selectedAction === FightOptions.attack) {
			if (this.heroTurn)
			{
				this.availableTargets = Teams.enemies;
			}
			else
			{
				this.availableTargets = Teams.heroes;
			}
			this.displayMessage = "Select a target for your attack.";
		} else if (this.selectedAction === FightOptions.specialAttack
			&& this.currentCharacter instanceof Hero
			&& this.currentCharacter.level < 3) {
				this.displayMessage = `Special attacks unlock for a character once they reach level 3`;
		} /*else if (this.selectedAction === FightOptions.specialAttack
			&& this.currentCharacter instanceof Hero
			&& this.currentCharacter.level > 2) 
            {
				if (this.currentCharacter.turnsUntilSpecialAvailableAgain) {
					this.displayMessage = `Cannot use special attack yet. ${this.currentCharacter.turnsUntilSpecialAvailableAgain}
						turn(s) until it is available again.`;
				} else {
					if (this.currentCharacter instanceof Human) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Attack two targets at once with a small attack penalty. At level 6 and above, the attack penalty is removed.
							The two targets may be the same enemy`;
					}
					if (this.currentCharacter instanceof Elf) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Setup a trap to protect one of your heroes. The trap will prevent all damage and the enemy will take a turn
							to free itself from the trap. At level 6 and above, the trap will also deal up to 8 damage.`;
					}
					if (this.currentCharacter instanceof Dwarf) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Poison an enemy or add another stack of poison to an enemy to do up to 3 damage, with each stack of poison
							multiplying the damage. At level 6 and above, the damage is 1 - 6 times the number of poison stacks`;
					}
					if (this.currentCharacter instanceof Halfling) {
						this.availableTargets = Teams.enemies;
						this.displayMessage = `Select a hero to heal for up to 6 health plus an additional point for each point in the intelligence skill.
							At level 6 and above, you choose two targets to heal. The two targets can be the same hero.`;
					}
				}
		}*/
    }
    
    tryAttack(target: BaseCharacter) {
		if (this.freezeActions && this.heroTurn) {
			return;
		}
		if (target.isIncapacitated) {
			this.displayMessage = "That target is already incapacitated.";
			return;
		}

		if (this.selectedAction === FightOptions.attack) {
			this.freezeActions = true;
			this.attack(target);
        }else {
			this.displayMessage = `Please select an action option.`;
		}

		/*} else if (this.currentCharacter instanceof Hero
			&& this.currentCharacter.level > 2
			&& this.selectedAction === FightOptions.specialAttack) {

				const upgraded: boolean = this.currentCharacter.level > 5;

				if (this.currentCharacter instanceof Warrior) {
					this.warriorSpecialAttack(target, upgraded);
				}
				if (this.currentCharacter instanceof Ranger) {
					this.rangerSpecialAttack(target, upgraded);
				}
				if (this.currentCharacter instanceof Rogue) {
					this.rogueSpecialAttack(target, upgraded);
				}
				if (this.currentCharacter instanceof Priest) {
					this.priestSpecialAttack(target, upgraded);
				}

		} */

        
	}


    attack(target: BaseCharacter) {
		    this.availableTargets = Teams.none;
			let damage = this.currentCharacter.dealDamage();
			target.currentHealth -= damage;
			this.displayMessage = `${this.currentCharacter.name} hit ${target.name} dealing ${damage} damage.`;
			setTimeout(() => {
				if (target.currentHealth <= 0) {
					target.isIncapacitated = true;
					this.heroTurn ? this.enemiesIncapacitated++ : this.heroesIncapacitated++;
					this.checkIfWin();
				} else {
					this.nextTurn();
				}
			}, this.actionDelay);
		}

    checkIfWin() {
		this.selectedAction = FightOptions.none;
		if (this.enemiesIncapacitated === this.enemyParty.length) {
			this.displayMessage = `SQUAD 1 Win...`;
			this.showGameOverButton = true;
			this.gameControllerService.isFighting = false;
			return;
		}
		if (this.heroesIncapacitated === this.heroParty.length) {
			this.displayMessage = `SQUAD 2 Win...`;
			this.showGameOverButton = true;
			this.gameControllerService.isFighting = false;
			return;
		}
		this.nextTurn();
	}

    nextTurn() {
        /*if (this.currentCharacter instanceof Monster
        && this.currentCharacter.poisonStacks
        && !this.currentCharacter.hasTakenPoisonDamageThisTurn) {

            this.currentCharacter.hasTakenPoisonDamageThisTurn = true;
            let maxDamage = this.currentCharacter.isStrongPoisoned ? 6 : 3;
            let poisonDamage = (Math.floor(Math.random() * maxDamage) + 1 ) * this.currentCharacter.poisonStacks;
            this.currentCharacter.currentHealth -= poisonDamage;
            this.displayMessage = `${this.currentCharacter.name} took ${poisonDamage} poison damage`;
            if (this.currentCharacter.currentHealth <= 0) {
                this.currentCharacter.isIncapacitated = true;
                this.enemiesIncapacitated++;
            }
            setTimeout(() => {
                this.checkIfWin();
            }, this.actionDelay);
            return;
        }

        if (this.currentCharacter instanceof Monster && this.currentCharacter.hasTakenPoisonDamageThisTurn) {
            this.currentCharacter.hasTakenPoisonDamageThisTurn = false;
        }*/

        this.availableTargets = Teams.none;
        this.selectedAction = FightOptions.none;
        let nextCharacter;

        if (this.heroTurn) {
            nextCharacter = this.enemyParty[this.characterIndex];
			this.heroTurn = !this.heroTurn;
        } else {
			this.characterIndex++;
            nextCharacter = this.heroParty[this.characterIndex];
			this.heroTurn = !this.heroTurn;
        }

        if (nextCharacter) {
            if (!nextCharacter.isIncapacitated) {
                this.currentCharacter = nextCharacter;
                this.displayMessage = `It's ${this.currentCharacter.name}'s turn`;
                if (this.currentCharacter instanceof Hero) {
                    this.freezeActions = false;
                    if (this.currentCharacter.turnsUntilSpecialAvailableAgain) {
                        this.currentCharacter.turnsUntilSpecialAvailableAgain--;
                    }
				}
                
            } else {
                this.nextTurn();
            }
        } else {
            this.characterIndex = -1;
            this.nextTurn();
        }
    }

	gameOver() {
		this.gameControllerService.gameOver();
	}
}
