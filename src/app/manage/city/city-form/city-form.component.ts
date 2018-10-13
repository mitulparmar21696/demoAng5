import { Component, OnInit } from '@angular/core';
import { City } from '../shared/city.model';
import { ActiveInactive } from '../../facility-type/shared/active-inactive.model';
import { CityService } from '../shared/city.service';
import { Router, Data } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { Country } from '../../country/shared/country.model';
import { CountryService } from '../../country/shared/country.service';
import { State } from '../../state/shared/state.model';
import { CountryState } from '../shared/country-state.model';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent implements OnInit {
countryValue:number;
  city: City;
  countries: Country[];
  states: State[];
  // countryId:any;
  // stateId: any;
  selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
   buttonName: string = "Add";
  isClickedOnce: boolean = false;
   isInvalidFile: boolean = false;

   DropdownIsActiveList = [
    new ActiveInactive(1, "Active"),
    new ActiveInactive(0, "Inactive")
  ];

  formData = new FormData();

   isActiveId: any;
  loading:any;
  constructor(private _ftService: CityService, 
    private _cService: CountryService,
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.GetAllCountries();
    this.city = this._ftService.getter();
    if (this.city.ID == undefined) {
      this.buttonName = "Add";
      this.countryValue = 0;
    }
    else {
      this.buttonName = "Update";
      // this.countryId = this.city.CountryID;
      // this.stateId = this.city.stateID;
      this._ftService.GetStatesByCountryID(this.city.CountryID)
      .subscribe((data:any) => {
        // 
        this.states = data.data;
        this.countryValue = +this.city.CountryID;
      });
      // 
    }
    if (this.city.IsActive != undefined) {
      if (this.city.IsActive == '1') {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "City";
  }

  

  processForm() {
    this.isClickedOnce = true;
    this.loading=true;
    var cityName = $("#cityName").val().toString();    
    if ($.trim(cityName) == "") {
      this.city.Name = "";
      this.loading=false;
      alert('Please add city name');
    }
    else {
      this.city.IsActive = this.isActiveId.toString();
      this.city.CountryID = this.countryValue.toString();
      if (this.city.ID == undefined) {
        // this.city.CountryID = this.countryId.toString();
        // this.city.stateID = this.stateId.toString();
        this._ftService.InsertCity(this.city).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == '200') {
            
             alert("City added successfully");
             this._ftService.set_cities(tt.data);
             this.loading=false;
            this._router.navigate(['/manage/city']);
          }
          else {
            this.loading=false;
            alert('City already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } 
      else {
        this.city.CountryID = this.countryValue.toString();
        // this.city.stateID = this.stateId.toString();
        // this.city.CountryID = this.countryValue;
        this.city.IsActive = this.isActiveId.toString();
        this._ftService.UpdateCity(this.city).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == '200') {
            alert( "City updated successfully");
            this._ftService.set_cities(tt.data);
            this.loading=false;
            this._router.navigate(['/manage/city']);
          }
          else {
            this.loading=false;
            alert('City already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToCity() {
    this._router.navigate(['/manage/city']);
  }


  GetAllCountries() {
    this._cService.GetActiveCountryList().subscribe((data: any) => {
      this._cService.set_countries(data.data);
      this.countries = this._cService.get_countries();
    })
  }

  GetStatesOFtheCity(cID) {
    
    this._ftService.GetStatesByCountryID(cID)
    .subscribe((data:any) => {
      console.log(data.data.length);
       
        this.states = data.data;
        console.log(this.states)
    }) ;
  }
}
