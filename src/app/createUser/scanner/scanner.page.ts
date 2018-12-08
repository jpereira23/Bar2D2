import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnEnter } from '../../on-enter';
import { AlertController } from '@ionic/angular'
import { QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import { Subscription } from 'rxjs/subscription';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';

@Component({
  selector: 'scanner',
  templateUrl: 'scanner.page.html'
})

export class ScannerPage{
  private isBackMode: boolean = true;
  private isFlashLightOn: boolean = false;
  private scanSub: any;
  private subscription: Subscription;

  constructor(private scanner: QRScanner, private alertCtrl: AlertController, private router: Router){
    this.showCamera();
    this.scanner.prepare().then((status: QRScannerStatus) => {

      if(status.authorized){
        this.scanner.scan().subscribe((text: string) => {

        });
        this.scanner.show();
      } else if(status.denied){
        console.log('Camera permission denied');
      } else {
        console.log('Permission denied for this runtime');
      }
    }).catch((e: any) => console.log('Error is ', e));
  }

  async debuggingAlert(){
    const theAlert = await this.alertCtrl.create({
      header: 'Authroized and scan has been called',
      subHeader: 'A OK',
      buttons:[{
          text: 'OK',
          role: 'Cancel',
          handler: () => {
            console.log("Fuck you");
          }
        }]
    });
    await theAlert.present();
  }
  toggleFlashLight(){
    this.isFlashLightOn = !this.isFlashLightOn;
    if(this.isFlashLightOn){
      this.scanner.enableLight();
    } else {
      this.scanner.disableLight();
    }
  }

  toggleCamera(){
    this.isBackMode = !this.isBackMode;
    if(this.isBackMode){
      this.scanner.useFrontCamera();
    } else {
      this.scanner.useBackCamera();
    }
  }

  showCamera(){
    (window.document.querySelector('app-root') as HTMLElement).classList.add('cameraView');
  }

  hideCamera(){
    (window.document.querySelector('app-root') as HTMLElement).classList.remove('cameraView');
  }

}
