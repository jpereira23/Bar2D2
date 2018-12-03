import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { ContactPageModule } from '../contact/contact.module';
import { DrinkPageModule } from '../drink/drink.module';
import { MenuPageModule } from '../menu/menu.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ContactPageModule,
    DrinkPageModule,
    MenuPageModule,
    IonicStorageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
