import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
  IonicStorageModule.forRoot()],
  providers: [DeviceMotion, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
