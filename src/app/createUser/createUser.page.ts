import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { Robot } from '../models/robot';

@Component({
  selector: 'app-create-user',
  templateUrl: 'createUser.page.html',
  styleUrls: ['createUser.page.scss']
})

export class CreateUserPage {

  robot = new Robot();
  constructor(private storage: Storage, private router: Router){

  }

  saveStuff(){
    this.storage.set("aUser", this.robot);
    this.router.navigate(['/']);
  }
}
