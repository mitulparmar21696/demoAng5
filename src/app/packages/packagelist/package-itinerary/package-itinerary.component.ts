import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { PackageItineraryService } from '../shared/package-itinerary.service';
import { PackageIntinerary } from '../shared/package-intinerary.model';
import { ArrayToStringService } from '../../../shared/services/ArrayToString.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'app-package-itinerary',
  templateUrl: './package-itinerary.component.html',
  styleUrls: ['./package-itinerary.component.css']
})
export class PackageItineraryComponent implements OnInit {

  private itinerarys: PackageIntinerary[] = [];
  //private itinerary: PackageIntinerary;

  private localIties: LocalIntinerary[] = [];
  private localIty: LocalIntinerary;

  private checkLocalIties: LocalIntinerary[] = [];

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];
  private isActiveId: any;

  private cities: any[] = [];
  private cityId: any;

  private facilities: any[] = [];
  private facilityId: any;

  private buttonName: string = "ADD";

  private isDisplay: boolean = false;

  private isClicked: boolean = false;

  private loading = false;

  constructor(private _router: Router
    , private _cService: CommonService
    , private _pService: PackageItineraryService
    , private _arrayService: ArrayToStringService
    , private _packageService: PackageService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.GetFacilityList(0, "", "", true, "listing");
    this.GetCityList();
    this.isActiveId = true;
    if (this._cService.packageId > 0) {
      this.GetPackageItineraryList();
    }
    else {
      $(document).ready(function () {
        $("#packageNav li").removeClass("active");
        $("#packageNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['packages/list/form/package']);
    }
  }

  GetCityList() {
    this._pService.GetpackageCityList(this._cService.packageId).subscribe((data: any) => {
      this.cities = data.data;
    }, (error) => {
      console.log(error);
    });
  }

  GetPackageItineraryList() {
    this._pService.GetItineraryList(this._cService.packageId).subscribe((data: any) => {
      this.BindData(data);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  BindData(data: any) {
    this.localIties = [];
    if (this._cService.numberOfDays > 0) {
      this.isDisplay = true;
      for (let index = 1; index <= this._cService.numberOfDays; index++) {
        let objIT = new LocalIntinerary();
        objIT.ID = 0;
        objIT.CityID = 0;
        objIT.Day = 0;
        objIT.Description = "";
        objIT.FacilityID = "0";
        objIT.HotelID = "0";
        objIT.Location = "";
        objIT.PackageID = this._cService.packageId;
        objIT.Title = "";
        this.localIties.push(objIT);
      }
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          if (element.FacilityID && element.FacilityID !== "") {
            element.FacilityID = this._arrayService.StringToStringArrayConvert(element.FacilityID);
          }
          if (element.FacilityID && element.FacilityID !== "") {
            element.CityID = +element.CityID;
          }
          else {
            element.CityID = 0;
          }
        });
        this.checkLocalIties = data.data;
        let itIndex: number = 0;
        this.checkLocalIties.forEach(element => {
          if (this.localIties && this.localIties.length > 0 && itIndex < this.localIties.length) {
            //var objIT = this.localIties[itIndex];
            this.localIties[itIndex].ID = element.ID;
            this.localIties[itIndex].CityID = element.CityID;
            this.localIties[itIndex].Day = element.Day;
            this.localIties[itIndex].Description = element.Description;
            this.localIties[itIndex].FacilityID = element.FacilityID;
            this.localIties[itIndex].HotelID = element.HotelID;
            this.localIties[itIndex].Location = element.Location;
            this.localIties[itIndex].PackageID = this._cService.packageId;
            this.localIties[itIndex].Title = element.Title;
            itIndex++;
          }
        });
        this.buttonName = "UPDATE";
      }
      else {
        this.buttonName = "ADD";
      }
    }
    else {
      this.isDisplay = false;
    }
    this.loading = false;
  }

  GetFacilityList(id, name, description, isActive, operationType) {
    this._packageService.GetFacility(id, name, description, isActive, operationType).subscribe((data: any) => {
      this.facilities = data.data;
    }, (error) => {
      console.log(error);
    });
  }

  SavePackageItineraryDetails() {
    if (!this.isClicked) {
      this.loading = true;
      this.isClicked = true;
      let iti = this.localIties;
      let packageId = this._cService.packageId;
      let hotelId: string = "";
      let operationType: string = "";
      let day: number = 1;
      if (this.buttonName.toLowerCase() === "add") {
        operationType = "insert";
      }
      else {
        operationType = "insert";
      }
      this.localIties.forEach(element => {
        var faciltitySting = "";
        if (element.FacilityID && element.FacilityID.length > 0) {
          faciltitySting = this._arrayService.ArrayToStringConvert(element.FacilityID);
        }
        element.FacilityID = faciltitySting;
        element.PackageID = packageId;
        element.HotelID = hotelId;
        element.ID = 0;
        element.Day = day;
        day = day + 1;
        let actualIti = new PackageIntinerary();
        actualIti.ItineraryID = element.ID;
        actualIti.Title = element.Title;
        actualIti.Description = element.Description;
        actualIti.FacilityID = element.FacilityID;
        actualIti.CityID = element.CityID;
        actualIti.Location = element.Location;
        actualIti.Day = element.Day;
        actualIti.HotelID = element.HotelID;
        actualIti.PackageID = packageId;
        this.itinerarys.push(actualIti);
      });

      this._pService.InsertUpdateItinerary(this._cService.packageId, operationType, this.itinerarys).subscribe((data: any) => {
        this.BindData(data);
        this.isClicked = false;
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }

  CancelItinerary() {
    this.GetPackageItineraryList();
  }

  PreviousPackageitinerary() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(2)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagerate']);
  }

  NextPackageitinerary() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(4)").addClass("active");
    });
    this._router.navigate(['packages/list/form/itineraryphotos']);
  }

}


export class LocalIntinerary {
  ID: number;
  CityID: number;
  Day: number;
  Description: string;
  FacilityID: string;
  HotelID: string;
  Location: string;
  PackageID: number;
  Title: string;
}