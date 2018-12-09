import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OnEnter } from '../../on-enter';
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

export class MakeDrinkPage implements OnInit, OnDestroy, OnEnter{
  drink: Drink;
  index: number;
  count: number = 0;
  bartendId: string;
  user: string;
  private subscription: Subscription;
  userDrinks: Array<UserDrink> = [];
  constructor( private router: Router, private route: ActivatedRoute, private storage: Storage, private dataService: DataService, private alertCtrl: AlertController, private socketService: SocketService){
    this.dataService.userDrink$.subscribe(res => {
      this.userDrinks = res;
    });


    this.dataService.presentAlert$.subscribe(data => {
      this.count = data;
      this.presentTheAlert();
    });


  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd && event.url === 'makeDrink'){
        this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    this.index = +this.route.snapshot.paramMap.get('index');
    this.storage.get('drinks').then((data) => {
      this.drink = data[this.index];
      var order = new Order();
      order.aRobot = this.dataService.robot;
      order.theDrink = this.drink;
      this.dataService.sendOrder(order);
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

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
