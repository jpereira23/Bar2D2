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
  something: string;
  beverages: Array<Beverage> = [];
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
    /*
    this.dataService.presentAlert$.subscribe(res => {
      this.presentTheAlert();
    });
    */
    this.dataService.refreshData();

  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event: NavigationEnd) => {

      if(event instanceof NavigationEnd && event.url === '/tabs/(drink:drink)'){
        this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((e: NavigationEnd) => {
      if(e.url == "/drinkIsDone"){
        this.presentTheAlert();
      }
    });
  }

  async presentTheAlert(){
    const theAlert = await this.alertCtrl.create({
      header: 'Drink Finished',
      subHeader: 'The robot has successfully made your drink, enjoy!',
      buttons:[{
        text: 'OK',
        role: 'Cancel',
        handler: () => {
          //this.router.navigate(['']);
        }
      }]
    });
    await theAlert.present();
  }


  selectDrink(j: number){
    var navigationExtras: NavigationExtras = {
      queryParams: {
        "index": j
      }
    }
    this.router.navigate(['makeDrink'], navigationExtras);
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
