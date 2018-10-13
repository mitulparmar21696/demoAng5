import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/currency.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CurrencyService } from '../shared/currency.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { debug } from 'util';

@Component({
  selector: 'app-currency-listing',
  templateUrl: './currency-listing.component.html',
  styleUrls: ['./currency-listing.component.css']
})
export class CurrencyListingComponent implements OnInit {
  Ids:number[] = [];
  currencies: Currency[] = [];
  currency = new Currency();
  selectedCurrencies: Currency[]= [];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'CountryName', header: 'Country' },
    { field: 'Name', header: 'Currency' },
    { field: 'CurrencyImage', header: 'Currency Symbol' },
    { field: 'Shortcode', header: 'Short Code' },
    { field: 'IsActive', header: 'Active?' },

    // { field: 'IsDefault', header: 'IsDefault?' }
  ];
  selectedCurrenciesString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;

  isDefaultValue: number = 0;
  loading:any;
  constructor(private _currencyService: CurrencyService, 
              private _router: Router) {
                this.loading=false;    
}
  ngOnInit() {
    this.loading=true;
    this.GetCurrenciesListFromService(); 
    this.nameId = '1';
    
  }
 CustomAction() {
 
  if (this.nameId && this.selectedCurrencies && this.selectedCurrencies.length > 0) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      
         this.selectedCurrencies.forEach(element => {
           
          this.selectedCurrenciesString += element.ID + ",";
        });
        this.selectedCurrenciesString = this.selectedCurrenciesString.length > 0 ? this.selectedCurrenciesString.substring(0, this.selectedCurrenciesString.length - 1) : ""
        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = "Active";
          else
            this.actionStatus = "Inactive";
          this._currencyService.ActionStatus(this.selectedCurrenciesString, this.actionStatus).subscribe((data: any) => {
            this.GetCurrenciesListFromService();
          }, (error) => {
            console.log(error);
          });
        }
        
        else if (this.nameId == 3) {
          
         this.selectedCurrencies.forEach(element => {
          if(element.IsDefault = 1) {
            this.isDefaultValue = this.isDefaultValue + 1;
          }
         });
          if (this.isDefaultValue >= 1 ) {
            alert('Cannot delete a default currency')
            this.GetCurrenciesListFromService();
            this.currencies = this._currencyService.get_currencies();
          }
          else {
            
          this._currencyService.ActionDelete(this.selectedCurrenciesString).subscribe((data: any) => {
            this.GetCurrenciesListFromService();
          }, (error) => {
            console.log(error);
          });
          }
        }

        else {
          alert('select valid action');
        }

        this.selectedCurrenciesString = "";
        this.nameId = -1;

      }
      else {
       console.log('nothing should happen')
      }
      this.nameId = '1';
  }

  else {
    alert('Please select atleast one currency');
  }
}


  GetCurrencysList() {
    this.GetCurrenciesListFromService();
  }

  DeleteCurrency(currency) {
    if(currency.IsDefault == 1){
      alert('Cannot delete a default currency')
    }
    else {
    if (confirm('Are you want to delete?') == true) {
      this.DeleteCurrencyFromService(currency);
      this.GetCurrenciesListFromService();
    } 
    else {
        this.GetCurrenciesListFromService();
    }
  }
  }

  GetCurrenciesListFromService() {
    this._currencyService.GetCurrencyList().subscribe((data: any) => {
      
      console.log(data);
      this._currencyService.set_currencies(data.data);
      this.currencies = this._currencyService.get_currencies();
      // this.DefaultCurrencies();
      this.loading=false; 
      }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

 

  DeleteCurrencyFromService(currency) {
    this._currencyService.DeleteCurrency(currency).subscribe((data: any) => {
      this.GetCurrenciesListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertCurrency() {
    let currency = new Currency();
    this._currencyService.set_currency(currency);
    this._router.navigate(['/manage/currency/form'])
  }


  UpdateCurrency(currency) {

  this._currencyService.set_currency(currency);
      this._router.navigate(['/manage/currency/form'])
    
  }


  Status(changeTo, currency: Currency) {

   console.log(this.Ids.length);
 
     if (confirm('Are you sure to perform this action?') == true) {
      console.log(changeTo, currency);

    currency.IsActive = changeTo;

    this._currencyService.UpdateCurrency(currency).subscribe((success:any) => {
      console.log(success)
      this._currencyService.set_currencies(success.data);
     this.currencies = this._currencyService.get_currencies();
   }) }

     else 
     {
       this.GetCurrenciesListFromService();
       console.log('dont do anything');
     }
  }

  IsDefaultStatus(changeTo, currency: Currency) {
    
   if(changeTo == 1) {
    if (confirm('Are you sure to perform this action?') == true) {
     console.log(changeTo, currency);
  
      currency.IsDefault = changeTo;

     this._currencyService.UpdateCurrency(currency).subscribe((success:any) => {
       
       console.log(success)
       this._currencyService.set_currencies(success.data);
      this.currencies = this._currencyService.get_currencies();
    }) }
    else {
      this.GetCurrenciesListFromService();
    }
  }
    else 
    {
      this.GetCurrenciesListFromService();
      alert('Please select anyother default')
      console.log('dont do anything');
    }
 }
 ChangeDefault(event, currency) {
   
   let value = event.target.checked;
   if(value == true) {
     currency.IsDefault = 1; 
   }
   else {
     currency.IsDefault = 0;
   }

   this._currencyService.UpdateCurrency(currency).subscribe((data: any) => {
    if(data.Status == 200 || data.Status == '200') {
    alert(currency.Name + ' is set to default currency');
    }
    else {
      console.log(data);
      console.log('could not update');
    }      
  }
  )
 }
}
