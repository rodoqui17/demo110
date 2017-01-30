import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, public push: Push) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.registerToken();
      this.getNotifications();
    });
  }

  private registerToken(){
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t,{
        ignore_user: true
      });
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });
  }

  private getNotifications(){
    this.push.rx.notification()
    .subscribe((msg) => {
      alert(msg.title + ': ' + msg.text);
    });
  }
}
