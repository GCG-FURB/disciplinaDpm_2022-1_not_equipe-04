import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
  IonicStorageModule.forRoot(),
  HttpClientModule],
  providers: [Camera, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
