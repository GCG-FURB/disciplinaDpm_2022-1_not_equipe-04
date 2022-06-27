import { Component, ViewChild } from '@angular/core';
import { Doenca, Contato, Medicamento, Alergia, StorageService } from '../storage.service';
 
import { Platform, ToastController, IonList, AlertController } from '@ionic/angular';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient, HttpClientModule  } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  ipesp = "10.0.0.101";
  led1ligado = false;  

  constructor(public httpClient: HttpClient, public alertController: AlertController) {

    this.led1ligado = false;

  }

  dados(){
    
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = {}

    this.httpClient.get("http://"+this.ipesp+"/", postData, )
      .subscribe(data => {
        
        console.log(data);
        alert("aaaa");

       }, error => {

        var retorno = error.error.text;
        var dados = retorno.split(" | ");

        this.alertController.create({
          header: 'Informações',
          message: "Temperatura: "+  dados[0]+" ºC <br/> Umidade: "+dados[1]+"%"
        }).then(res => {
          res.present();
        });

      });
  }

  lampada1(tipo){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let postData = {}

    let string = '';

    if(tipo){
      string = 'led1off';
      this.led1ligado = false;
    }else{
      string = 'led1on';
      this.led1ligado = true;
    }

    this.httpClient.get("http://"+this.ipesp+"/"+string, postData, )
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });

  }

}
