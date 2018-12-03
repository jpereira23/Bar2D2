import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavParams, ModalController } from '@ionic/angular';
import { Drink } from '../../models/drink';
import { Subscription } from 'rxjs/subscription';
import { switchMap } from 'rxjs/operators';
import { UserDrink } from '../../models/userDrink';
import { Router, ActivatedRoute, NavigationExtras, NavigationEnd, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { Order } from '../../models/order';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-make-drink',
  templateUrl: 'makeDrink.page.html',
  styleUrls: ['makeDrink.page.scss']
})

export class MakeDrinkPage{
  drink: Drink;
  index: number;
  count: number = 0;
  bartendId: string;
  userDrinks: Array<UserDrink> = [];
  constructor( private router: Router, private route: ActivatedRoute, private storage: Storage, private dataService: DataService, private alertCtrl: AlertController, private socketService: SocketService){
    this.dataService.userDrink$.subscribe(res => {
      this.userDrinks = res;
    });
    this.index = +this.route.snapshot.paramMap.get('index');
    this.storage.get('drinks').then((data) => {
      this.drink = data[this.index];
      var order = new Order();
      order.aRobot = this.dataService.robot;
      order.theDrink = this.drink;
      this.dataService.sendOrder(order);
    });

    this.dataService.presentAlert$.subscribe(data => {
      this.count = data;
      this.presentTheAlert();
    });

    this.socketService.testing$.subscribe(data => {
      this.count = data;
      this.presentTheAlert();
    });


  }

  async presentTheAlert(){
    const theAlert = await this.alertCtrl.create({
      header: 'Drink Finished',
      subHeader: 'The robot (' + this.count + ') has successfully made your drink, enjoy!',
      buttons:[{
        text: 'OK',
        role: 'Cancel',
        handler: () => {
          this.router.navigate(['']);
        }
      }]
    });
    await theAlert.present();
  }

}
