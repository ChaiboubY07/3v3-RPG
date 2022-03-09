import {Injectable} from '@angular/core'
import { Router } from '@angular/router';
import { RaceOptions, WeaponOptions } from '../models/character-options';
import { checkRace, Dwarf, Elf, Halfling, Hero, Human} from '../models/characters';

@Injectable()
export class GameControllerService{
    constructor(private router : Router){}

    mainCharacter!: Hero;
    isFighting: boolean = false;

    actionDelay: number = 1500;
    remainingPlaces:number = 6;

    heroParty: Hero[] = [];
    availableHeroes: Hero[] = [];
    enemyParty: Hero[] = [];

    setHeroes(character: { race: string; weapon: string; name: string; player:string}){
        switch(character.race){
            case RaceOptions.human:
                this.mainCharacter = new Human(character.name,1,10,5,character.weapon);
                break;
            case RaceOptions.dwarf:
                this.mainCharacter = new Dwarf(character.name,1,10,5,character.weapon);
                break;
            case RaceOptions.elf:
                this.mainCharacter = new Elf(character.name,1,10,5,character.weapon);
                break;
            case RaceOptions.halfling:
                this.mainCharacter = new Halfling(character.name,1,10,5,character.weapon);
                break;
        }

        checkRace(this.mainCharacter);
        this.heroParty.push(this.mainCharacter);

        this.remainingPlaces--;
        character.player="Player : "+(this.remainingPlaces+1)/2;
        this.router.navigate(["./squad2"]);
    }

    setEnemies(character: { race: string; weapon: string; name: string; player:string}){
        switch(character.race){
            case RaceOptions.human:
                this.mainCharacter = new Human(character.name,1,10,5,character.weapon);
                break;
            case RaceOptions.dwarf:
                this.mainCharacter = new Dwarf(character.name,1,10,5,character.weapon);
                break;
            case RaceOptions.elf:
                this.mainCharacter = new Elf(character.name,1,10,5,character.weapon);
                break;
            case RaceOptions.halfling:
                this.mainCharacter = new Halfling(character.name,1,10,5,character.weapon);
                break;
        }

        checkRace(this.mainCharacter);
        this.enemyParty.push(this.mainCharacter);
        
        this.remainingPlaces--;
        character.player="Player : "+(this.remainingPlaces+1)/2;
        if(this.remainingPlaces > 1){
            this.router.navigate(["./squad1"]);
        }
        else {
            this.router.navigate(["./fight"]);
        }
    }



    gameOver(): void{
        this.heroParty = [];
        this.availableHeroes = [];
        this.enemyParty = [];

        //this.router.navigateByUrl("/");
    }


}