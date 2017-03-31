import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { DataService } from '../../providers/data-service';
import { UserService } from '../../providers/user-service';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DataService]
})
export class LoginPage {
  public form: FormGroup;

  constructor(public toastCtrl: ToastController,
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public dataService: DataService,
    public userService: UserService) {

    this.form = this.fb.group({
      userName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    if (this.userService.authenticate()) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {

  }

  submit() {
    let loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });

    loading.present();

    this.dataService.authenticate(this.form.value)
      .subscribe(data => {
        loading.dismiss();
        console.log(data);
        this.userService.save({ name: 'Júnior', image: 'http://www.weblocacao.com.br/Content/img/logo.png' }, data.token);
        this.navCtrl.setRoot(HomePage);
      }, error => {
        loading.dismiss();
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