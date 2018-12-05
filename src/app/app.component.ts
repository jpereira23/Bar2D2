import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Socket } from 'ng-socket-io';
import { Router } from '@angular/router';
import { AlertController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private socket: Socket,
    private alertCtrl: AlertController,
    private router: Router
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.socket.on("12345", (data) => {
        this.presentTheAlert();
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
          this.router.navigate(['']);
        }
      }]
    });
    await theAlert.present();
  }
}
