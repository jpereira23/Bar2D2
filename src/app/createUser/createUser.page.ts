import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { Robot } from '../models/robot';
import { ModalController } from '@ionic/angular';
import { ScannerPage } from './scanner/scanner.page';


@Component({
  selector: 'app-create-user',
  templateUrl: 'createUser.page.html',
  styleUrls: ['createUser.page.scss']
})

export class CreateUserPage {

  robot = new Robot();
  constructor(private storage: Storage, private router: Router, private modalCtrl: ModalController){

  }

  saveStuff(){
    this.storage.set("aUser", this.robot);
    this.router.navigate(['/']);
  }

  scanCode(){
    //this.router.navigate(['scannerPage']);
    this.scanModal();
  }

  async scanModal(){
    const modal = await this.modalCtrl.create({
      component: ScannerPage
    });
    return await modal.present();
  }


}
