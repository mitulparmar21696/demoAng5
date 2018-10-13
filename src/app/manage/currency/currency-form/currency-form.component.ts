import { Component, OnInit, ViewChild } from '@angular/core';
import { Currency } from '../shared/currency.model';
import { ActiveInactive } from '../../facility-type/shared/active-inactive.model';
import { Country } from '../../country/shared/country.model';
import { CurrencyService } from '../shared/currency.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { CountryService } from '../../country/shared/country.service';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css']
})
export class CurrencyFormComponent implements OnInit {
  @ViewChild('currencyName')
  currencyName:any;

  @ViewChild('currencyImage')
  currencyImage:any
  // countryClicked:number = 0;
   currency: Currency
  selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
  //  facilites: FacilityType[];
   buttonName: string = "Add";

   isClickedOnce: boolean = false;
   currencies: Currency[] = [];
   isInvalidFile: boolean = false;

   DropdownIsActiveList = [
    new ActiveInactive(1, "Active"),
    new ActiveInactive(0, "Inactive")
  ];

   DropdownIsDefaultList = [ 
    new ActiveInactive(1, "Default"),
    new ActiveInactive(0, "Not Default")
  ]
   countries: Country[] = [];
   isActiveId: any;
   isDefault: number;
   countryID: any;

  loading:any;
  constructor(private _currencyService: CurrencyService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService,
    private _countryService: CountryService) {
    this.isActiveId = 1;
    this.isDefault = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._countryService.GetActiveCountryList().subscribe((data: any)=> {
      this.countries = data.data 
    })
    this.currency = this._currencyService.get_currency();
    if (this.currency.ID == undefined) {
      this.buttonName = "Add";
      this.countryID = 0;
      this.isDefault = 0;
      this.isInvalidFile = true
    }
    else {
      this.buttonName = "Update";
      this.countryID = this.currency.CountryID;
      this.isDefault = this.currency.IsDefault;
    }
   
   if (this.currency.IsActive != undefined) {
      if (this.currency.IsActive == 1) {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Currency";
  }

 
  processForm() {
    this.isClickedOnce = true;
    this.loading=true;
    var currencyName = $("#currencyName").val().toString();  
    var currencyImage = $("#currencyImage").val().toString();
    
    if ($.trim(currencyName) == "") {
      this.loading=false;
      this.currency.Name = "";
      alert('Please add currency name');
    }
    if($.trim(currencyImage) == "") {
      this.loading=false;
      this.currency.CurrencyImage = "";
      alert('Please add currency symbol');
    }
    
    else{
      this.currency.CountryID = this.countryID;
      this.currency.IsActive = this.isActiveId.toString();
      this.currency.IsDefault = this.isDefault;
      if (this.currency.ID == undefined) {
        
        this._currencyService.InsertCurrency(this.currency).subscribe((currency: any) => {
          
          if(currency.status == 200 || currency.status == '200') {  
             this._currencyService.set_currencies(currency.data);
             this.currency = this._currencyService.get_currency();
             alert("Currency has been added successfully")
             this.loading=false;
             this._router.navigate(['/manage/currency']);
          }
          else {
            this.loading=false;
            alert("Currency already exists");
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
      
      else {
          
          
          this.currency.IsDefault = this.isDefault;
          this.currency.CountryID = this.countryID;
          this._currencyService.UpdateCurrency(this.currency).subscribe((currency: any) => {
            
            if (currency.status == 200 || currency.status == '200') {            
              this._currencyService.set_currencies(currency.data);
              this.currency = this._currencyService.get_currency();
              this.loading=false;
              this._router.navigate(['/manage/currency']);
              }
            else {
              this.loading=false;
              alert('Currency already exists.');
            }
          }, (error) => {
            this.loading=false;
            console.log(error);
          });
      
    
      
      }
  }
    this.isClickedOnce = false;
  }
  
  BackToCurrency() {
    this._router.navigate(['/manage/currency']);
  }

  ShouldBe(event) {
    // this.countryClicked = 1;
    this.isInvalidFile = false
  }

  ChangeDefault(event) {
    
    let value = event.target.checked;
    if(value == true) {
      this.isDefault = 1
    }
    else if(value == false) {
      this.isDefault = 0;
    }
  }
}
