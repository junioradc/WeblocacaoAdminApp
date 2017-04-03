import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../providers/data-service';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the ModalAccountStoreList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-account-store-list',
  templateUrl: 'modal-account-store-list.html',
  providers: [DataService]

})
export class ModalAccountStoreListPage {
  data;
  idAccount: any;
  storeName: any;
  idPlan: any;
  qtty: any;
  expirationDate: any;
  expiratedDate: any;
  public form: FormGroup;


  constructor(public dataService: DataService, private fb: FormBuilder,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.idAccount = this.navParams.data.idAccount;
    this.storeName = this.navParams.data.storeName;
    this.idPlan = this.navParams.data.idPlan;
    this.expiratedDate = this.navParams.data.expirationDate;

    this.form = this.fb.group({
      payDescription: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])],
      idAccount: [this.idAccount, Validators.compose([
        Validators.required
      ])],
      idPlan: [this.idPlan, Validators.compose([
        Validators.required
      ])],
      qtty: [1, Validators.compose([
        Validators.required
      ])],
      totalCost: [140, Validators.compose([
        Validators.required
      ])],
      expiratedDate: [this.expiratedDate, Validators.compose([
        Validators.required
      ])],
      expirationDate: [null, Validators.compose([
        Validators.required
      ])],
      updatePlan: [false, Validators.compose([
        Validators.required
      ])],
    });

  }

  ionViewDidLoad() {
    console.log("this.idPlan");
    console.log(this.idPlan);


  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  save() {

    let loading = this.loadingCtrl.create({
      content: 'Incluindo pagamento...'
    });

    loading.present();
    this.dataService.addPay(this.form.value)
      .subscribe(data => {
        loading.dismiss();
         let toast = this.toastCtrl.create({
          message: 'Pagamento incluído com sucesso: ',
          duration: 7000,
          position: 'top'
        });
        toast.present();
        this.dismiss();
      }, error => {
        loading.dismiss();
        console.log(error._body);
        let toast = this.toastCtrl.create({
          message: 'Error ao salvar pagamento: ' + error._body,
          duration: 7000,
          position: 'top'
        });
        toast.present();
      }
      );
  }

}


