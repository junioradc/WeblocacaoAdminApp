import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';

@Injectable()
export class DataService {
    private serviceUrl: string = 'http://localhost:5000/api/';
    // private serviceUrl: string = 'http://localhost/WeblocacaoAdmin/api/';

    constructor(public http: Http, public toastCtrl: ToastController) {
    }

    authenticate(data: any) {
        return this.http.get(this.serviceUrl + 'Oauth?userName=' + data.userName + '&password=' + data.password)
            .map((res: Response) => res.json());
    }

    getAccountStoreList() {
        var token = localStorage.getItem('wlapp.token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`); Headers
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.serviceUrl + 'Account',options)
            .map((res: Response) => res.json());
    }

     addPay(data: any) {
         console.log(data);
        var token = localStorage.getItem('wlapp.token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`); Headers
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(this.serviceUrl + 'Account', data, options)
            .map((res: Response) => res.json());
    }

}
