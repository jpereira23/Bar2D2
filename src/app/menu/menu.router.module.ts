import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuPage } from './menu.page';
import { AddDrinkPage } from './addDrink/addDrink.page';
import { EditDrinkPage } from './editDrink/editDrink.page';


const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  {
    path: 'addDrink',
    component: AddDrinkPage
  },
  {
    path: 'editDrink',
    component: EditDrinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})

export class MenuPageRoutingModule {}
