import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrinkPage } from './drink.page';
import { MakeDrinkPage } from './makeDrink/makeDrink.page';
import { CreateUserPage } from '../createUser/createUser.page';


const routes: Routes = [
  {
    path: '',
    component: DrinkPage
  },
  {
    path: 'makeDrink',
    component: MakeDrinkPage
  },
  {
    path: 'createUser',
    component: CreateUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DrinkPageRoutingModule {}
