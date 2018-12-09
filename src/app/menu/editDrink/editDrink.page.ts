import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnEnter } from '../../on-enter';
import { Router, NavigationEnd, ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription } from 'rxjs/subscription';
import { DataService } from '../../data.service';
import { Drink } from '../../models/drink';
import { MixerAlcohol } from '../../models/mixer-alcohol';
import { Beverage } from '../../models/beverage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-drink',
  templateUrl: 'editDrink.page.html',
  styleUrls: ['editDrink.page.scss']
})

export class EditDrinkPage implements OnInit, OnEnter, OnDestroy{
  index: number;
  drink: Drink;
  overHundred: boolean = false;
  beverages: Array<Beverage> = [];
  drinks: Array<Drink> = [];
  private subscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private storage: Storage, private dataService: DataService){
    this.index = +this.route.snapshot.paramMap.get('index');
    this.storage.get('drinks').then((data) => {
      this.drink = data[this.index];
      this.drinks = data;
      this.drinks.splice(this.index, 1);
    });

    this.dataService.beverage$.subscribe(res => {
      this.beverages = [];
      this.beverages = res;
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
    this.dataService.refreshData();
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
