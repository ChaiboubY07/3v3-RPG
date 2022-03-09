import { Component } from '@angular/core';
import { GameControllerService } from 'src/app/services/game-controller.service';
import { CharacterOptions } from 'src/app/models/character-options';
import { Router } from '@angular/router';

@Component({
    selector: "story-component",
    templateUrl: "./story.component.html",
    styleUrls: ["story.component.css"]
})
export class StoryComponent{
    constructor(private gameControllerService: GameControllerService,
        private router: Router){}

    
}