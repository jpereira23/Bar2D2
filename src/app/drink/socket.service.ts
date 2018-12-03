import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Socket } from 'ng-socket-io';


@Injectable()
export class SocketService{
  isCount: number = 0;
  testing$: Subject<number>;
  constructor(private socket: Socket){
    this.isCount++;
    this.testing$ = new Subject<number>();
    this.socket.on("12345", (data) => {
      this.testing$.next(this.isCount);
      /*
      if(data.username == this.robot.username){
        this.presentAlert$.next(this.aCount);
      } else {
        var drinks: Array<UserDrink> = [];
        for(var i = 0; i < data.message.length; i++){
          var aDrink = new UserDrink();
          aDrink.username = data.message[i].aRobot.username;
          aDrink.drinkName = data.message[i].theDrink.drinkName;
          drinks.push(aDrink);
        }
        this.userDrink$.next(drinks);

      }
      */
    });
  }

}
