import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, NavParams, ModalController } from '@ionic/angular';
import { Drink } from '../../models/drink';
import { Subscription } from 'rxjs/subscription';
import { switchMap } from 'rxjs/operators';
import { UserDrink } from '../../models/userDrink';
import { Router, ActivatedRoute, NavigationExtras, NavigationEnd, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { Order } from '../../models/order';
import { Socket } from 'ng-socket-io';
import { OnEnter } from '../../on-enter';

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
  constructor( private router: Router, private route: ActivatedRoute, private storage: Storage, private dataService: DataService, private alertCtrl: AlertController){

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

    this.dataService.done$.subscribe(data => {
      //this.dataService.presentAlert$.next(1);
      this.router.navigate(['drinkIsDone']);
    });
  }


}
