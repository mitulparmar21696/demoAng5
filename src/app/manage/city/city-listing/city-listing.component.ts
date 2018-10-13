import { Component, OnInit } from '@angular/core';
import { City } from '../shared/city.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CityService } from '../shared/city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-listing',
  templateUrl: './city-listing.component.html',
  styleUrls: ['./city-listing.component.css']
})
export class CityListingComponent implements OnInit {
  cities: City[] = [];
  city= new City();
  selectedFTs: City[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'CountryName', header: 'Country Name' },
    { field: 'StateName', header: 'State Name' },
    { field: 'Name', header: 'City Name' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedCityString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;


  // readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _ctService: CityService, 
              private _router: Router ) {
                this.loading=false;    
  }

  ngOnInit() {
    this.loading=true;
    this.GetCityListFromService();  
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedFTs && this.selectedFTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedFTs.forEach(element => {
            this.selectedCityString += element.ID + ",";
          });
          this.selectedCityString = this.selectedCityString.length > 0 ? this.selectedCityString.substring(0, this.selectedCityString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._ctService.ActionStatus(this.selectedCityString, this.actionStatus).subscribe((data: any) => {
              this.GetCityListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ctService.ActionDelete(this.selectedCityString).subscribe((data: any) => {
              
              this.GetCityListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedCityString = "";
          this.nameId = -1;

        }  
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one city');
    }
  }

  GetCityList() {
    this.GetCityListFromService();
  }

  DeleteCity(city: City) {
    
    if (confirm('Are you sure to perform this action?') == true)
    {
      this.DeleteCityFromService(city);
      this.GetCityListFromService();
    }
    else {
        this.GetCityListFromService();
      }
  }

  GetCityListFromService() {
    this._ctService.GetCityList().subscribe((data: any) => {
      
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "1" ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourtype;
        //   }
        // });
      });
      this._ctService.set_cities(data.data);
      this.cities = this._ctService.getCities();
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteCityFromService(tt) {
    this._ctService.DeleteCity(tt).subscribe((data: any) => {
      this.GetCityListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertCity() {
    let city = new City();
    this._ctService.setter(city);
    this._router.navigate(['/manage/city/form'])
  }

  UpdateCity(tt) {
    if (confirm('Are you sure to perform this action?') == true) {
        this._ctService.setter(tt);
        this._router.navigate(['/manage/city/form'])
    }
    else {
        this.GetCityListFromService();
      }
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: City) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      ft.IsActive = changeTo;
      this._ctService.UpdateCity(ft).subscribe((success:any) => {
        // success.data.forEach(element => {
        //   element.IsActive = element.IsActive == "1" ? true : false;
        // });
      this._ctService.set_cities(success.data);
      this.cities = this._ctService.getCities();
      
    });
    }
      
    else 
      {
        this.GetCityListFromService();
      }
  }
}
