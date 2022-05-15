import { Component, ViewChild } from '@angular/core';
import { Doenca, Contato, Medicamento, Alergia, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList, AlertController } from '@ionic/angular';

import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data: any;
  subscription: any;

  constructor(private deviceMotion: DeviceMotion) {
  }

  iniciar(){

    this.subscription = this.deviceMotion.watchAcceleration({frequency: 500}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data = acceleration;
    });

  }

  terminar(){
    this.subscription.unsubscribe();
  }

}
