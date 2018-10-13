import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from '../shared/invoice.model';
import { InvoiceService } from '../shared/invoice.service';

@Component({
  selector: 'app-invoice-add',
  templateUrl: './invoice-add.component.html',
  styleUrls: ['./invoice-add.component.css']
})
export class InvoiceAddComponent implements OnInit {

  private UserEmail: string = "";
  private invoice:Invoice;

  constructor(private _inService: InvoiceService, private _router: Router) { }

  ngOnInit() {
  }

  ValidateEmail(){
    // 
    let isValidEmail = true;

    if(this.UserEmail.trim() == ""){
      isValidEmail = false;
      this.UserEmail = this.UserEmail.trim();
      alert("Please enter email");
    }
    if(isValidEmail){
      var atpos = this.UserEmail.indexOf("@");
      var dotpos = this.UserEmail.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=this.UserEmail.length) {
        isValidEmail = false;
        alert("Please enter valid email");
        return false;
      }
    }
    
    if(isValidEmail){
      this._inService.ValidateUserEmail(this.UserEmail).subscribe((data: any) => {
        console.log(data.data);
        this.invoice = data.data[0];
        console.log(this.invoice);
        this._inService.setter(this.invoice);
        this._router.navigate(['/invoice/form'])
      }, (error) => {
        console.log(error);
      });
    }
  }

  BacktoList() {
    this._router.navigate(['invoice/list']);
  }

}
