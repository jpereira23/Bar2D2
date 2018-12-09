import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuPageRoutingModule } from './menu.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuPage } from './menu.page';
import { AddDrinkPage } from './addDrink/addDrink.page';
import { EditDrinkPage } from './editDrink/editDrink.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage, AddDrinkPage, EditDrinkPage]
})

export class MenuPageModule {}
