import { Component, OnInit, OnDestroy} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OnEnter } from '../on-enter';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/subscription';
import { Drink } from '../models/drink';
import { MakeDrinkPage } from './makeDrink/makeDrink.page';
import { Beverage } from '../models/beverage';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-drink',
  templateUrl: 'drink.page.html',
  styleUrls: ['drink.page.scss']
})

export class DrinkPage implements OnInit, OnEnter, OnDestroy{
  private subscription: Subscription;
  drinks: Array<Drink> = [];
  beverages: Array<Beverage> = [];
  connected: boolean = false;
  constructor(private router: Router, private dataService: DataService, private alertCtrl: AlertController){
    // Get slots from the server

    this.dataService.beverage$.subscribe(res => {
      this.beverages = [];
      this.beverages = res;
    });

    this.dataService.drink$.subscribe(res => {
      this.drinks = [];
      this.drinks = res;
    });

    this.dataService.prompt$.subscribe(res => {
      if(res == false){
        this.router.navigate(['createUser']);
      }
    });

    this.dataService.bluetoothI$.subscribe(res => {
      if(res == true){
        this.connected = true;
      } else {
        this.connected = false;
      }
    });

  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd && event.url === '/tabs/(drink:drink)'){
        this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    //this.dataService.refreshData();
  }


  selectDrink(j: number){
    if(this.connected == true){
      var navigationExtras: NavigationExtras = {
        queryParams: {
          "index": j
        }
      }
      this.router.navigate(['makeDrink'], navigationExtras);
    } else if(this.connected == false){
      this.bluetoothFalse();
    }
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  async bluetoothFalse(){
    const theAlert = await this.alertCtrl.create({
      header: 'Robot is not connected',
      subHeader: 'Please go to the tablet and make sure the indicator is on blue, if not press the indicator.',
      buttons:[{
        text: 'OK',
        role: 'Cancel',
        handler: () => {
        }
      }]
    });
    await theAlert.present();
  }

}
