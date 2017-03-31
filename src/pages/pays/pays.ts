import { Component } from '@angular/core';
import { DataService } from '../../providers/data-service';
import { NavController, NavParams, LoadingController, ModalController, Platform, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ModalAccountStoreListPage } from '../modal-account-store-list/modal-account-store-list'

@Component({
  selector: 'page-pays',
  templateUrl: 'pays.html',
  providers: [DataService]

})
export class PaysPage {
  public listStores: any;

  constructor(public dataService: DataService, public modalCtrl: ModalController,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {


  }
  openModal(data) {
     console.log(data);
    let modal = this.modalCtrl.create(ModalAccountStoreListPage, data);
    modal.present();
  }


  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });

    loading.present();

    this.dataService.getAccountStoreList()
      .subscribe(data => {
        loading.dismiss();
        this.listStores = data;
        console.log(data);
      }, error => {
        loading.dismiss();
        this.listStores = null;
        console.log(error._body);
        let toast = this.toastCtrl.create({
          message: 'Error ao autenticar: ' + error._body,
          duration: 7000,
          position: 'top'
        });
        toast.present();
      }
      );
  }

}

