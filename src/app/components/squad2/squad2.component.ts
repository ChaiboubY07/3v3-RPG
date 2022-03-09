import { Component } from '@angular/core';
import { GameControllerService } from 'src/app/services/game-controller.service';
import { CharacterOptions } from "../../models/character-options";

@Component({
    selector: "squad2-component",
    templateUrl: "./squad2.component.html",
    styleUrls: ["squad2.component.css"]
})
export class Squad2Component{

    constructor(private gameControllerService: GameControllerService) {}
    
    character = {
        race:'--Choose--',
        weapon:'--Choose--',
        name:'',
        player:'Player 3'
    }
    
    characterComplete: boolean = false;

    races = CharacterOptions.races;
    weapons = CharacterOptions.weapons;

    changeRace(race: string){
        this.character.race = race;
        this.checkCompleted();
    }

    changeWeapon(weapon: string){
        this.character.weapon = weapon;
        this.checkCompleted();
    }

    changeName(){
        this.checkCompleted();
    }

    checkCompleted() {
        this.characterComplete = this.character.race !== "--Choose--"
            && this.character.weapon !== "--Choose--"
            && this.character.name !== undefined
    }

    createCharacter() {
        if(!this.characterComplete) {
            return;
        }
        this.gameControllerService.setEnemies(this.character);
    }
    
}