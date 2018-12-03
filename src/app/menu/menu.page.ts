import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnEnter } from '../on-enter';
import { DataService } from '../data.service';
import { Beverage } from '../models/beverage';
import { Router, NavigationEnd } from '@angular/router';
import { Drink } from '../models/drink';
import { Subscription } from 'rxjs/subscription';


@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})

export class MenuPage implements OnInit, OnEnter, OnDestroy {
private subscription: Subscription;
  private beverages: Array<Beverage> = [];
  private drinks: Array<Drink> = [];

  constructor(private dataService: DataService, private router: Router){

    // Get slots from the server
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

    this.subscription = this.router.events.subscribe((event) => {
        if(event instanceof NavigationEnd && event.url === '/tabs/(menu:menu)'){
          this.onEnter();
        }
    })
  }

  public async onEnter(): Promise<void> {
    this.dataService.refreshData();
  }

  addDrink(){
    this.router.navigate(['addDrink']);
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
