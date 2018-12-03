import { Robot } from './robot';
import { Drink } from './drink';

export class Order{
  aRobot: Robot;
  theDrink: Drink;

  constructor(){
    this.aRobot = null;
    this.theDrink = null;
  }
}
