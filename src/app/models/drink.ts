import { MixerAlcohol } from './mixer-alcohol';

export class Drink{
  drinkName: string;
  mixerAlcohols: Array<MixerAlcohol>;
  selectedForDeleting: boolean;
  constructor(){
    this.drinkName = "";
    this.mixerAlcohols = [];
    this.selectedForDeleting = false;
  }
}
