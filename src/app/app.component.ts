import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PaysPage } from '../pages/pays/pays';
import { UserService } from '../providers/user-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   public user: any;
   public token: any;

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public userService: UserService, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'lock', title:'Login', component: LoginPage },
      {  icon: 'home', title:'Home', component: HomePage },
      { icon: 'cash', title:'Pagamentos', component: PaysPage }
    ];

     this.userService.userChange.subscribe((data) => {
      this.user = this.userService.loadUser();
      this.token = this.userService.loadToken();
     // console.log(this.token);
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

   logout() {
    this.userService.logout();
    this.nav.setRoot(LoginPage);
  }
}
