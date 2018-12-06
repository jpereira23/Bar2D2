import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnEnter } from '../../on-enter';
import { Router, NavigationEnd } from '@angular/router';
import { MixerAlcohol } from '../../models/mixer-alcohol';
import { Beverage } from '../../models/beverage';
import { Drink } from '../../models/drink';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/subscription';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-add-drink',
  templateUrl: 'addDrink.page.html',
  styleUrls: ['addDrink.page.scss']
})

export class AddDrinkPage implements OnInit, OnEnter, OnDestroy{
  private subscription: Subscription;
  drink: Drink = new Drink();
  overHundred: boolean = false;
  currentMixerAlcohol: MixerAlcohol = new MixerAlcohol();
  beverages: Array<Beverage> = [];
  drinks: Array<Drink> = [];

  constructor(private dataService: DataService, private router: Router, private storage: Storage){
    this.dataService.beverage$.subscribe(res => {
      this.beverages = [];
      this.beverages = res;
    });

    this.dataService.drink$.subscribe(res => {
      this.drinks = [];
      this.drinks = res;
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((events) => {
      if(event instanceof NavigationEnd && event.url === 'addDrink'){
        this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    //this.dataService.refreshData();
  }

  addABeverage(){
    if(this.drink.mixerAlcohols.length < 6){
      var total = 10;
      for(var i = 0; i < this.drink.mixerAlcohols.length; i++){
        total = total - this.drink.mixerAlcohols[i].scale;
      }

      var aMixerAlcohol = new MixerAlcohol();
      aMixerAlcohol.max = total;
      this.drink.mixerAlcohols.push(aMixerAlcohol);
    }
  }

  submit(){
    this.drinks.push(this.drink);
    this.storage.set('drinks', this.drinks);
    this.router.navigate(['']);
  }

  changingPercentage(){

    var sum = 0;
    for(var i = 0; i < this.drink.mixerAlcohols.length; i++){
      sum = sum + this.drink.mixerAlcohols[i].scale;
    }

    if(sum > 10){
      this.overHundred = true;
    } else {
      this.overHundred = false;
    }
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
