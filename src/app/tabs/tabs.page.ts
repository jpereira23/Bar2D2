import { Component, ViewChild } from '@angular/core';
import { Tabs } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{

  constructor(private storage: Storage, private dataService: DataService, private router: Router){

  }

  tabChanged(){
    //this.dataService.recheckSlots();
  }
}
