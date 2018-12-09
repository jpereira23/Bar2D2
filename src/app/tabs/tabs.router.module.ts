import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ContactPage } from '../contact/contact.page';
import { DrinkPage } from '../drink/drink.page';
import { MenuPage } from '../menu/menu.page';
import { SettingsPage } from '../settings/settings.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(drink:drink)',
        pathMatch: 'full',
      },
      {
        path: 'drink',
        outlet: 'drink',
        component: DrinkPage
      },
      {
        path: 'menu',
        outlet: 'menu',
        component: MenuPage
      },
      {
        path: 'settings',
        outlet: 'settings',
        component: SettingsPage
      }

    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(drink:drink)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
