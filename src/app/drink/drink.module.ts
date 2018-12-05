import { IonicModule } from '@ionic/angular';
import { RouterModule, RouteReuseStrategy } from '@angular/router';;
import { NgModule } from '@angular/core';
import { DrinkRouteReuseStrategy } from './drink-route-reuse-strategy';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrinkPage } from './drink.page';
import { DrinkPageRoutingModule } from './drink.router.module';
import { MakeDrinkPage } from './makeDrink/makeDrink.page';
import { CreateUserPage } from '../createUser/createUser.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DrinkPageRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: DrinkRouteReuseStrategy }
  ],
  declarations: [DrinkPage, MakeDrinkPage, CreateUserPage]
})

export class DrinkPageModule {}
