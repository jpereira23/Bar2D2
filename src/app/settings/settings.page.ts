import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(private dataService: DataService){

  }

  save(){
    this.dataService.setRobot();
  }
}
