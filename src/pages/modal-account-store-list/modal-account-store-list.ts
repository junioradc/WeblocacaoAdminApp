import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';

/*
  Generated class for the ModalAccountStoreList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-account-store-list',
  templateUrl: 'modal-account-store-list.html'
})
export class ModalAccountStoreListPage {
  data;
  idAccount: any;
  storeName: any;
  expirationDate: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,  public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log("this.data");
    console.log(this.navParams.data);
     this.idAccount = this.navParams.data.idAccount;
     this.storeName = this.navParams.data.storeName;
     this.expirationDate = this.navParams.data.expirationDate;
  }
   dismiss() {
    this.viewCtrl.dismiss();
  }

}
