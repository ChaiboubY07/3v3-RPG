import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { StartComponent } from './components/start/start.component';
import { Squad2Component } from "./components/squad2/squad2.component";
import { Squad1Component } from "./components/squad1/squad1.component";
import { FightComponent } from './components/fight/fight.component';
import { GameControllerService } from './services/game-controller.service';

const routes: Routes = [
  {path:"", component: StartComponent},
  {path:"squad1", component: Squad1Component},
  {path:"squad2", component: Squad2Component},
  {path:"fight", component: FightComponent},
  {path:"**", redirectTo:""}
]


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    Squad1Component,
    Squad2Component,
    FightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    GameControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
