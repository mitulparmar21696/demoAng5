import { Component, OnInit } from '@angular/core';
import { Invoice } from '../shared/invoice.model';
import { InvoiceService } from '../shared/invoice.service';
import { Router } from '@angular/router';
import { InvoiceDetails } from '../shared/invoice-detail.model';
import { InvoiceDetailForm } from '../shared/invoice-form.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { InvoiceRequestForm } from '../shared/invoice-req-form.model';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  private invoice: Invoice;
  private buttonName: string = "Add";
  private discountType: string;
  private invoiceDetailForm: InvoiceDetailForm;
  private invoiceReqForm: InvoiceRequestForm = new InvoiceRequestForm();

  private invoiceDetails: InvoiceDetails[] = [];
  private newInvoiceDetails: InvoiceDetails = new InvoiceDetails();

  private discountOptions: SelectItem[] = [
    { label: '%', value: 'InPercentages' },
    { label: 'Rs', value: 'InRupees' }
  ];
  private cols: any[] = [
    { field: 'Description', header: 'Description' },
    { field: 'Quantity', header: 'Quantity' },
    { field: 'Rate', header: 'Rate' },
    { field: 'Total', header: 'Total' },
  ];

  constructor(private _inService:InvoiceService, private _router:Router) { 
    this.invoiceDetailForm = new InvoiceDetailForm();
  }

  ngOnInit() {
    this.invoice = this._inService.getter();
    this.discountType = "InPercentages";
    if (this.invoice.ID == undefined) {
      this.buttonName = "Add";
      this.invoiceDetailForm.UserName = this.invoice.UserName;
      this.invoiceDetailForm.EmailID = this.invoice.EmailID;
      this.invoiceDetailForm.DueDate = this.invoice.DueDate;
      this.invoiceDetailForm.InvoiceDate = this.invoice.InvoiceDate;
      this.invoiceDetailForm.InvoiceNo = this.invoice.InvoiceNo;
      this.invoiceDetailForm.MobileNo = this.invoice.MobileNo;
      this.invoiceDetailForm.DueBalance = this.invoice.BalanceDue;

      let invoiceDetails = {
        "InvoiceID" : 0,
        "PackageName" : "",
        "Quantity": 0,
        "Rate" : 0,
        "Total" : 0
      }
      this.invoiceDetailForm.InvoiceDetails = this.invoiceDetailForm.InvoiceDetails == undefined ? [] : this.invoiceDetailForm.InvoiceDetails;
      this.invoiceDetailForm.InvoiceDetails.push(invoiceDetails);
    }
    else {
      this.buttonName = "Update";
      this.GetInvoiceDetails(this.invoice.ID);
    }
  }

  GetInvoiceDetails(invoiceId){
    this._inService.GetInvoiceDetails(invoiceId).subscribe((data: any) => {
      console.log(data.data);
      this.invoiceDetailForm = data.data[0];
      if(this.invoiceDetailForm.InvoiceDetails != undefined){
        this.invoiceDetails = this.invoiceDetailForm.InvoiceDetails;
      }
    }, (error) => {
      console.log(error);
    });;
  }

  AddInvoiceDetails(){
    if(this.invoiceDetailForm.InvoiceDetails == undefined){
      this.invoiceDetailForm.InvoiceDetails = [];
    }
    this.invoiceDetailForm.InvoiceDetails.push(this.newInvoiceDetails)
    this.newInvoiceDetails = new InvoiceDetails();
  }

  DeleteInvoiceDetails(index: number){
    this.invoiceDetailForm.InvoiceDetails.splice(index, 1);
    this.invoiceDetailForm.GrandTotal = this.invoiceDetailForm.GrandTotal - this.invoiceDetailForm.InvoiceDetails[index].Total;
  }

  processForm(){
    console.log(this.invoiceDetailForm);
    if(this.invoiceDetailForm.InvoiceDetails.length > 0){
      console.log("Invoice Details is present");
      if(this.invoiceDetailForm.InvoiceDetails[0].Total != 0){
        if(this.invoiceDetailForm.InvoiceID != undefined){
          this.invoiceDetailForm.OprationType = "update";
        }
        else{
          this.invoiceDetailForm.OprationType = "insert";
        }
    
        this.invoiceDetailForm.DisAmount = this.invoiceDetailForm.Discount;
        this.invoiceDetailForm.Discount = this.invoiceDetailForm.DiscountPercentage;
        this.invoiceDetailForm.InvoiceDateTime = this.invoiceDetailForm.InvoiceDate;
        this.invoiceDetailForm.TaxAmount = this.invoiceDetailForm.Tex;
        this.invoiceDetailForm.TotalAmount = this.invoiceDetailForm.SubTotal;
    
        this._inService.UpdateInvoiceDetails(this.invoiceDetailForm).subscribe((data:any) => {
          console.log(data.data);
          this.BackToInvoice();
        }, error => {
          console.log(error);
        });
      }
      else{
        alert("Please add Invoice Details");
      }
    }
    else{
      alert("Please add atleast one Invoice Details");
    }
  }

  BackToInvoice() {
    this._router.navigate(['/invoice/list']);
  }

  AmountChange(event, index, inputValue){
    
    let Quantity = this.invoiceDetailForm.InvoiceDetails[index].Quantity;
    Quantity = Quantity == null ? 0 : Quantity;
    let Rate = this.invoiceDetailForm.InvoiceDetails[index].Rate;
    Rate = Rate == null ? 0 : Rate;
    this.invoiceDetailForm.InvoiceDetails[index].Total = Quantity * Rate;
    if(this.invoiceDetailForm.InvoiceDetails != undefined){
      let SubTotal = 0;
      this.invoiceDetailForm.InvoiceDetails.forEach(invoiceDetail => {
        invoiceDetail.Total = invoiceDetail.Total == null || invoiceDetail.Total == undefined ? 0 : invoiceDetail.Total;
        SubTotal += invoiceDetail.Total;
      });
      this.invoiceDetailForm.SubTotal = SubTotal;
      if(this.discountType == "InPercentages"){
        this.invoiceDetailForm.DiscountPercentage = this.invoiceDetailForm.DiscountPercentage == null || this.invoiceDetailForm.DiscountPercentage == undefined ? 0 : this.invoiceDetailForm.DiscountPercentage;
        this.invoiceDetailForm.Discount = (SubTotal * this.invoiceDetailForm.DiscountPercentage) / 100;
      }
      else if(this.discountType == "InRupees"){
        this.invoiceDetailForm.Discount = this.invoiceDetailForm.DiscountPercentage;
      }
      else{
        this.invoiceDetailForm.Discount = (SubTotal * this.invoiceDetailForm.DiscountPercentage) / 100;
      }
      let total = SubTotal -  this.invoiceDetailForm.Discount;
      this.invoiceDetailForm.Tex = this.invoiceDetailForm.Tex == undefined ? 0 : this.invoiceDetailForm.Tex;
      let tax = (total * this.invoiceDetailForm.Tex) / 100;

      this.invoiceDetailForm.GrandTotal = (this.invoiceDetailForm.SubTotal - this.invoiceDetailForm.Discount) + tax;
    }
    
  }

  AddAmountChange(event){
    let Quantity = this.newInvoiceDetails.Quantity;
    console.log(Quantity);
    Quantity = Quantity == null || Quantity == undefined ? 0 : Quantity;
    let Rate = this.newInvoiceDetails.Rate;
    console.log(Rate);
    Rate = Rate == null || Rate == undefined ? 0 : Rate;
    let newInvoiceDetailSubTotal = Quantity * Rate;
    let SubTotal = 0;
    this.newInvoiceDetails.Total = newInvoiceDetailSubTotal;
    if(this.invoiceDetailForm.InvoiceDetails != undefined){
      this.invoiceDetailForm.InvoiceDetails.forEach(invoiceDetail => {
        invoiceDetail.Total = invoiceDetail.Total == null || invoiceDetail.Total == undefined ? 0 : invoiceDetail.Total
        SubTotal += invoiceDetail.Total;
      });
    }
    
    SubTotal += newInvoiceDetailSubTotal;
    this.invoiceDetailForm.SubTotal = SubTotal;
    this.invoiceDetailForm.DiscountPercentage = this.invoiceDetailForm.DiscountPercentage == null || this.invoiceDetailForm.DiscountPercentage == undefined ? 0 : this.invoiceDetailForm.DiscountPercentage;
    
    if(this.discountType == "InPercentages"){
      this.invoiceDetailForm.Discount = (SubTotal * this.invoiceDetailForm.DiscountPercentage) / 100;
    }
    else if(this.discountType == "InRupees"){
      this.invoiceDetailForm.Discount = this.invoiceDetailForm.DiscountPercentage;
    }
    else{
      this.invoiceDetailForm.Discount = (SubTotal * this.invoiceDetailForm.DiscountPercentage) / 100;
    }
    let total = SubTotal -  this.invoiceDetailForm.Discount;
    this.invoiceDetailForm.Tex = this.invoiceDetailForm.Tex == null || this.invoiceDetailForm.Tex == undefined ? 0 : this.invoiceDetailForm.Tex;
    let tax = (total * this.invoiceDetailForm.Tex) / 100;
    this.invoiceDetailForm.GrandTotal = (this.invoiceDetailForm.SubTotal - this.invoiceDetailForm.Discount) + tax;
  }

  DiscountTaxAmountChange(event){
    this.invoiceDetailForm.DiscountPercentage = this.invoiceDetailForm.DiscountPercentage == null || this.invoiceDetailForm.DiscountPercentage == undefined ? 0 : this.invoiceDetailForm.DiscountPercentage;
    
    if(this.discountType == "InPercentages"){
      this.invoiceDetailForm.Discount = (this.invoiceDetailForm.SubTotal * this.invoiceDetailForm.DiscountPercentage) / 100;
    }
    else if(this.discountType == "InRupees"){
      this.invoiceDetailForm.Discount = this.invoiceDetailForm.DiscountPercentage;
    }
    else{
      this.invoiceDetailForm.Discount = (this.invoiceDetailForm.SubTotal * this.invoiceDetailForm.DiscountPercentage) / 100;
    }
    
    let total = this.invoiceDetailForm.SubTotal -  this.invoiceDetailForm.Discount;
    let tax = (total * this.invoiceDetailForm.Tex) / 100;
    this.invoiceDetailForm.GrandTotal = (this.invoiceDetailForm.SubTotal - this.invoiceDetailForm.Discount) + tax;    
  }

}