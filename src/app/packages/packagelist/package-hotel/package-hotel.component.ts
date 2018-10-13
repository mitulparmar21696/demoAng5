import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { PackageHotelService } from '../shared/package-hotel.service';

@Component({
  selector: 'app-package-hotel',
  templateUrl: './package-hotel.component.html',
  styleUrls: ['./package-hotel.component.css']
})
export class PackageHotelComponent implements OnInit {

  private hotelList: PackageCityHotel[] = [];
  private localHotelList: PackageCityHotel[] = [];

  private buttonName: string = "ADD";

  private isClicked: boolean = false;

  private loading = false;

  constructor(private _router: Router
    , private _hService: PackageHotelService
    , private _cService: CommonService) { }

  ngOnInit() {
    this.loading = true;
    if (this._cService.packageId > 0) {
      this.GetPackageHotels();
    }
    else {
      $(document).ready(function () {
        $("#packageNav li").removeClass("active");
        $("#packageNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['packages/list/form/package']);
    }
  }

  //1
  GetPackageHotels() {
    this._hService.GetPackageHotel(this._cService.packageId).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          let hotel = new PackageCityHotel();
          hotel.ID = 0;
          hotel.PackageID = this._cService.packageId;
          hotel.CityID = element.CityID;
          hotel.CityName = element.CityName;
          hotel.NoOfNights = "0";
          hotel.HotelID = 0;
          let hotelDetailList: Hotel[] = [];
          if (element.PackageHotel && element.PackageHotel.length > 0) {
            element.PackageHotel.forEach(element => {
              let objHotelDetail = new Hotel();
              objHotelDetail.ID = element.ID;
              objHotelDetail.HotelName = element.HotelName;
              hotelDetailList.push(objHotelDetail);
            });
            hotel.Hotels = hotelDetailList;
          }
          this.hotelList.push(hotel);
        });
        this.ViewHotelDetails();
      } else {
        this.loading = false;
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  ViewHotelDetails() {
    this._hService.ViewPackageHotelList(this._cService.packageId).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          let hotel = new PackageCityHotel();
          hotel.ID = element.ID;
          hotel.PackageID = this._cService.packageId;
          hotel.CityID = element.CityID;
          hotel.CityName = element.CityName;
          hotel.NoOfNights = element.NoOfNights;
          hotel.HotelID = element.HotelID;
          this.localHotelList.push(hotel);
        });
        if (this.hotelList && this.hotelList.length > 0) {
          this.hotelList.forEach(element => {
            let objPackageCityHotel: PackageCityHotel[] = this.localHotelList.filter(x => x.CityID == element.CityID);
            if (objPackageCityHotel && objPackageCityHotel.length > 0) {
              element.ID = objPackageCityHotel[0].ID;
              element.HotelID = objPackageCityHotel[0].HotelID;
              element.NoOfNights = objPackageCityHotel[0].NoOfNights;
            }
          });
        }
        this.loading = false;
      }
      else {
        this.loading = false;
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  SaveHotelDetails() {
    if (!this.isClicked) {
      this.loading = true;
      this.isClicked = true;
      let hotelData: SendHotel[] = [];
      let invalidHotelID: boolean = false;
      this.hotelList.forEach(element => {
        let objSendHotel = new SendHotel();
        objSendHotel.HotelID = element.HotelID;
        if (element.HotelID <= 0) {
          invalidHotelID = true;
        }
        objSendHotel.NoOfNights = element.NoOfNights.toString();
        hotelData.push(objSendHotel);
      });
      if (invalidHotelID) {
        this.loading = false;
        alert('Please select hotel');
        this.isClicked = false;
      }
      else {
        this._hService.InsertPackageHotel(hotelData, this._cService.packageId, "insert").subscribe((data: any) => {
          if (data.data && data.data.length > 0) {
            if (this.hotelList && this.hotelList.length > 0) {
              this.hotelList.forEach(element => {
                let objPackageCityHotel: PackageCityHotel[] = data.data.filter(x => x.CityID == element.CityID);
                if (objPackageCityHotel && objPackageCityHotel.length > 0) {
                  element.ID = objPackageCityHotel[0].ID;
                  element.HotelID = objPackageCityHotel[0].HotelID;
                  element.NoOfNights = objPackageCityHotel[0].NoOfNights;
                }
              });            
            }          
            this.loading = false;
            alert('Hotel Details Saved Successfully.');
            this.isClicked = false;
          }
          else{
            this.loading = false;
          }
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      }
    }
  }

  CancelHotelDetails() {
    this.loading = true;
    this.hotelList = [];
    this.localHotelList = [];
    this.GetPackageHotels();
  }

  PreviousPackagehotel() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(4)").addClass("active");
    });
    this._router.navigate(['packages/list/form/itineraryphotos']);
  }

  NextPackagehotel() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(6)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packageinclusion']);
  }

}

export class Hotel {
  ID: string;
  HotelName: string;
}

export class PackageCityHotel {
  ID: number;
  CityID: string;
  CityName: string;
  HotelID: number;
  Hotels: Hotel[];
  NoOfNights: string;
  PackageID: number;
}

export class SendHotel {
  HotelID: number;
  NoOfNights: string;
}

