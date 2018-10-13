import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Invoice } from '../shared/invoice.model';
import { InvoiceService } from '../shared/invoice.service';

@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.css']
})
export class InvoiceListingComponent implements OnInit {

  private invoices: Invoice[] = [];
  private selectedInvoices: Invoice[];

  private invoiceID: string;
  
  private actions: SelectItem[] = [
    { label: 'Delete', value: '1' }
  ];
  private cols: any[] = [
    { field: 'InvoiceNo', header: 'Invoice No' },
    { field: 'InvoiceDateTime', header: 'Invoice Date' },
    { field: 'UserName', header: 'User Name' },
    { field: 'TotalAmount', header: 'Total Amount' },
    { field: 'InvoiceStatus', header: 'Invoice Status' }
  ];

  constructor(private _inService: InvoiceService, private _router: Router) { }

  ngOnInit() {
    this.GetInvoiceList(0);
    this.invoiceID = "1";
  }

  GetInvoiceList(invoiceId: number){
    this.GetInvoiceListFromService();
  }

  GetInvoiceListFromService() {
    this._inService.GetInvoiceList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
      });
      this.invoices = data.data;
    }, (error) => {
      console.log(error);
    });
  }

  CustomAction(){
    console.log(this.selectedInvoices);
    if(this.invoiceID && this.selectedInvoices && this.selectedInvoices.length > 0){
      if (confirm('Are you sure to perform this action?') == true) {
        let selectedInvoicesString = "";
        this.selectedInvoices.forEach(element => {
          selectedInvoicesString += element.ID + ",";
        });
        selectedInvoicesString = selectedInvoicesString.length > 0 ? selectedInvoicesString.substring(0, selectedInvoicesString.length - 1) : ""
        console.log(selectedInvoicesString);
        this._inService.DeleteInvoice(selectedInvoicesString).subscribe((data:any) => {
          this.GetInvoiceListFromService();
        }, (error) => {
          console.log(error);
        });
      }
    }
    else{
      alert('Please select atleast one invoice');
    }
    this.invoiceID = '1';
  }

  InsertInvoice() {
    this.NavigateToEmailForm();
  }

  UpdateInvoice(invoice:Invoice){
    console.log("Update : " + invoice);
    this._inService.setter(invoice);
    this.NavigateToForm();

  }

  DeleteInvoice(invoice:Invoice){
    console.log("Delete : " + invoice.ID);
    
    if (confirm('Are you sure to delete this record?') == true) {
      this.DeleteInvoiceFromService(invoice.ID);
      // this.GetTourtypeListFromService();
    }
  }

  DeleteInvoiceFromService(invoiceId){
    this._inService.DeleteInvoice(invoiceId).subscribe((data:any) => {
      console.log(data.data);
      this.GetInvoiceListFromService();
    }, (error) => {
      console.log(error);
    })
  }

  NavigateToEmailForm() {
    this._router.navigate(['/invoice/add']);
  }

  NavigateToForm() {
    this._router.navigate(['/invoice/form']);
  }

}
