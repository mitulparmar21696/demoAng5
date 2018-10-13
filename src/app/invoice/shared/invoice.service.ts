import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import { Invoice } from './invoice.model';
import { InvoiceDetailForm } from './invoice-form.model';

@Injectable()
export class InvoiceService {

    readonly rootUrl = environment.WebAPIUrl2;
    private invoice = new Invoice();
  
    setter(invoice: Invoice) {
      this.invoice = invoice;
    }
  
    getter() {
      return this.invoice;
    }

    constructor(private http: HttpClient) { }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    GetInvoiceList() {
        const body = {
            OprationType:"listing",
        };
        var reqHeader = new HttpHeaders({
          //'No-Auth': 'True',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootUrl + 'AdminInvoice', JSON.stringify(body), { headers: reqHeader });
    }

    ValidateUserEmail(userEmail){
        console.log(userEmail);
        const body = {
            EmailID: userEmail,
        };
        var reqHeader = new HttpHeaders({
          //'No-Auth': 'True',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootUrl + 'AdminInvoiceVerification', JSON.stringify(body), { headers: reqHeader });
    }

    GetInvoiceDetails(invoiceId){
        const body = {
            InvoiceID : invoiceId,
        };
        var reqHeader = new HttpHeaders({
          //'No-Auth': 'True',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootUrl + 'InvoiceDetails', JSON.stringify(body), { headers: reqHeader });
    }

    UpdateInvoiceDetails(invoiceDetailsForm: InvoiceDetailForm){
        const body = invoiceDetailsForm;
        var reqHeader = new HttpHeaders({
          //'No-Auth': 'True',
          'Content-Type': 'application/json'
        });
        return this.http.post(this.rootUrl + 'AdminInvoice', JSON.stringify(body), { headers: reqHeader });
    }

    DeleteInvoice(invoiceId: string) {
      const body = {
        InvoiceID: invoiceId,
        OprationType: "delete"
      };
  
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return this.http.post(this.rootUrl + 'AdminInvoice', JSON.stringify(body), { headers: reqHeader });
    }
}