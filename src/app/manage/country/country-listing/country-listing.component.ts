import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../shared/country.service';
import { Country } from '../shared/country.model';
import { environment } from '../../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-country-listing',
  templateUrl: './country-listing.component.html',
  styleUrls: ['./country-listing.component.css']
})
export class CountryListingComponent implements OnInit {

  countries: Country[] = [];
  country = new Country();
  selectedCountries: Country[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'ShortName', header: 'Short Name' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedCountriesString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;
  loading:any;

  constructor(private _cService: CountryService, 
    private _router: Router ) {   
      this.loading=false; 
}
  ngOnInit() {
    this.loading=true;
    this.GetCountriesListFromService(); 
    this.nameId = '1';
  }


  CustomAction() {
   
    if (this.nameId && this.selectedCountries && this.selectedCountries.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
          this.selectedCountries.forEach(element => {
            this.selectedCountriesString += element.ID + ",";
          });
          this.selectedCountriesString = this.selectedCountriesString.length > 0 ? this.selectedCountriesString.substring(0, this.selectedCountriesString.length - 1) : ""
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._cService.ActionStatus(this.selectedCountriesString, this.actionStatus).subscribe((data: any) => {
              this.GetCountriesListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._cService.ActionDelete(this.selectedCountriesString).subscribe((data: any) => {
              this.GetCountriesListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedCountriesString = "";
          this.nameId = -1;

        } 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
      }
    else {
        alert('Please select atleast one country');
    }
  }

  GetCountriesList() {
    this.GetCountriesListFromService();
  }

  DeleteCountry(country) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.DeleteCountryFromService(country);
      this.GetCountriesListFromService();
    } 
    else {
        this.GetCountriesListFromService();
    }

  }

  GetCountriesListFromService() {
    this._cService.GetCountryList().subscribe((data: any) => {
      this._cService.set_countries(data.data);
      this.countries = this._cService.get_countries();
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteCountryFromService(country) {
    this._cService.DeleteCountry(country).subscribe((data: any) => {
      this.GetCountriesListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertCountry() {
    let country = new Country();
    this._cService.set_country(country);
    this._router.navigate(['/manage/country/form'])
  }


  UpdateCountry(country) {

      this._cService.set_country(country);
      this._router.navigate(['/manage/country/form'])    
    
  }


  Status(changeTo, country: Country) {

   
     if (confirm('Are you sure to perform this action?') == true) {
    
     this.actionStatus = changeTo;
     let ID = country.ID.toString();

      this._cService.ActionStatus(ID, this.actionStatus).subscribe((success:any) => {
        this._cService.set_countries(success.data);
       this.countries = this._cService.get_countries();
     }) }

     else 
     {
       this.GetCountriesListFromService();
     }
  }

}

