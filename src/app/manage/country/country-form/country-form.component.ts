import { Component, OnInit } from '@angular/core';
import { CountryService } from '../shared/country.service';
import { Router } from '@angular/router';
import { Country } from '../shared/country.model';
import { ActiveInactive } from '../../facility-type/shared/active-inactive.model';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {

   country: Country;

  selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
   buttonName: string = "Add";

   isClickedOnce: boolean = false;

   isInvalidFile: boolean = false;

   DropdownIsActiveList = [
    new ActiveInactive(1, "Active"),
    new ActiveInactive(0, "Inactive")
  ];

   isActiveId: any;
  loading:any;
  constructor(private _cService: CountryService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.country = this._cService.get_country();
    if (this.country.ID == undefined) {
      this.buttonName = "Add";
    }
    else {
      this.buttonName = "Update";
    }
    if (this.country.IsActive != undefined) {
      if (this.country.IsActive == 1) {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Country";
  }

 
  processForm() {
    this.loading=true;
    this.isClickedOnce = true;
    var countryName = $("#countryName").val().toString();    
    if ($.trim(countryName) == "") {
      this.country.Name = "";
      this.loading=false;
      alert('Please add country name');
    }
    else {
      this.country.IsActive = this.isActiveId;
      if (this.country.ID == undefined) {
        
        this._cService.InsertCountry(this.country).subscribe((country: any) => {
          if (country.status == 200 || country.status == '200') {
            
            
             alert("Country has been added successfully ");

             this._cService.set_countries(country.data);
             this.country = this._cService.get_country();
             this.loading=false;
             this._router.navigate(['/manage/country']);
          }
          else {
            this.loading=false;
            alert('Country already exists !')
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } 
      else {
        this._cService.UpdateCountry(this.country).subscribe((country: any) => {
          if (country.status == 200 || country.status == '200') {
            alert( 'Country updated Successfully');
            this._cService.set_countries(country.data);
            this.loading=false;
            this._router.navigate(['/manage/country']);
          }
          else {
            this.loading=false;
            alert('Country already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToCountry() {
    this._router.navigate(['/manage/country']);
  }
}
