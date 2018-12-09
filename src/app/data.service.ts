import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Beverage } from './models/beverage';
import { Storage } from '@ionic/storage';
import { Drink } from './models/drink';
import { UserDrink } from './models/userDrink';
import { Robot } from './models/robot';
import { Order } from './models/order';
import { Socket } from 'ng-socket-io';


export interface Config {
  slots: Array<Beverage>;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class DataService{
  url = 'http://138.197.205.247:8080/api';
  beverage$: Subject<Array<Beverage>>;
  drink$: Subject<Array<Drink>>;
  prompt$: Subject<boolean>;
  userDrink$: Subject<Array<UserDrink>>;
  robot$: Subject<Robot>;
  robot: Robot;
  theDrink$: Subject<Drink>;
  presentAlert$: Subject<number>;
  aCount: number = 0;



  constructor(private storage: Storage, private http: HttpClient, private socket: Socket){
    this.beverage$ = new Subject<Array<Beverage>>();
    this.drink$ = new Subject<Array<Drink>>();
    this.prompt$ = new Subject<boolean>();
    this.userDrink$ = new Subject<Array<UserDrink>>();
    this.presentAlert$ = new Subject<number>();
    this.robot$ = new Subject<Robot>();

  }

  configSlots(robot: Robot){
    this.robot = robot;

  }

  setRobot(){
    this.storage.set('aUser', this.robot);
  }

  refreshData(){
    this.storage.get('aUser').then(data => {
      if(data != null){
        this.robot = data;
        this.robot$.next(this.robot);
        var anObservable = Observable.fromPromise(this.storage.get('drinks'));
        forkJoin(anObservable,this.http.get<Array<Beverage>>(`${this.url}/getSlots/${this.robot.bartendId}`)).subscribe(data => {
          if(data[1] != null){
            this.beverage$.next(data[1]);
          }
          if(data[0] != null){
            this.drink$.next(data[0]);
          }
        });
      } else {
        this.prompt$.next(false);
      }
    });
  }

  setDrinks(drinks: Array<Drink>){
    this.storage.set('drinks', drinks);
  }

  sendOrder(order: Order){
    this.http.post<Order>(`${this.url}/sendOrder`, order, httpOptions).subscribe(res => {
      console.log(res);
    });
  }
}
