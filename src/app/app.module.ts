import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PaysPage } from '../pages/pays/pays';
import {ModalAccountStoreListPage} from '../pages/modal-account-store-list/modal-account-store-list'

//services
import { UserService } from '../providers/user-service';
import { CartService } from '../providers/cart-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    PaysPage,
    ModalAccountStoreListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    // CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    PaysPage,
    ModalAccountStoreListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService
  ]
})
export class AppModule { }
