import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { CountryService } from '../../../shared/services/country/country.service';
import { CurrencyService } from '../../../shared/services/currency/currency.service';
import { Country } from '../../../shared/services/country/country.model';
import { Currency } from '../../../shared/services/currency/currency.model';
import { HotelService } from '../../../shared/services/hotel/hotel.service';
import { Hotel } from '../../../shared/services/hotel/hotel.model';
import { TourtypeService } from '../../tourtype/shared/tourtype.service';
import { TourcategoryService } from '../../tourcategory/shared/tourcategory.service';
import { Tourtype } from '../../tourtype/shared/tourtype.model';
import { Tourcategory } from '../../tourcategory/shared/tourcategory.model';
import { CommonService } from '../shared/common.service';
import { DestinationService } from '../shared/destination.service';
import { Destination } from '../shared/destination.model';
import { Month } from '../../../shared/models/dd-months/months.model';
import { ArrayToStringService } from '../../../shared/services/ArrayToString.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  private buttonName: string = "ADD";

  selectedDropwdownValue: IsActive = new IsActive(true, "Active");

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];

  private isActiveId: any;

  private countries: Country[] = [];
  private countryId: any;

  private currencies: Currency[] = [];
  private currencyId: any;
  private isDefaultCurrencyId: number = 0;

  private hotels: Hotel[] = [];
  private hotelId: any;

  private tourTypes: Tourtype[] = [];
  private tourId: any;

  private tourCategories: Tourcategory[] = [];
  private tourCatId: any;

  private destination: Destination;

  private months: Month[] = [];
  private fromMonthId: any;
  private toMonthId: any;

  loading = false;

  constructor(private _router: Router, private _destService: DestinationService
    , private _commonService: CommonService
    , private _countryService: CountryService
    , private _currencyService: CurrencyService, private _hotelService: HotelService
    , private _tourTypeService: TourtypeService, private _tourCatService: TourcategoryService
    , private _ArrayToStringService: ArrayToStringService) { }

  ngOnInit() {
    this.loading = true;
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(1)").addClass("active");
    });

    this.months.push(new Month(1, "January"));
    this.months.push(new Month(2, "February"));
    this.months.push(new Month(3, "March"));
    this.months.push(new Month(4, "April"));
    this.months.push(new Month(5, "May"));
    this.months.push(new Month(6, "June"));
    this.months.push(new Month(7, "July"));
    this.months.push(new Month(8, "August"));
    this.months.push(new Month(9, "September"));
    this.months.push(new Month(10, "October"));
    this.months.push(new Month(11, "November"));
    this.months.push(new Month(12, "December"));

    this.GetTourtypeList();

    this.GetTourCategoryList();

    this.GetCountryList();

    this.GetCurrencyList();

    if (this._commonService.destinationId <= 0) {
      this.destination = new Destination();
      this.isActiveId = true;
      this.tourId = 0;
      this.tourCatId = 0;
      this.countryId = 0;
      //this.currencyId = this.isDefaultCurrencyId;
      this.hotelId = 0;
      this.fromMonthId = 0;
      this.toMonthId = 0;
      this.buttonName = "ADD";
      //this.loading = false;
    }
    else {
      //this.GetDestinationByID(this._commonService.destinationId);
      this.destination = this._destService.getter();
      this.buttonName = "UPDATE";
      if (this.destination.CountryID != undefined && this.destination.CountryID != "") {
        this.countryId = this._ArrayToStringService.StringToIntegerArrayConvert(this.destination.CountryID);
        this.GetHotelList(this.destination.CountryID, this.destination.HotelID);
      }
      if (this.destination.IsActive != undefined) {
        if (this.destination.IsActive == true) {
          this.isActiveId = true;
        }
        else {
          this.isActiveId = false;
        }
      }
      if (this.destination.TourTypeID != undefined) {
        this.tourId = this.destination.TourTypeID;
      }
      if (this.destination.CurrencyID != undefined) {
        this.currencyId = this.destination.CurrencyID;
        if (this.currencyId && this.currencyId <= 0) {
          this.currencyId = this.isDefaultCurrencyId;
        }
      }
      else {
        this.currencyId = this.isDefaultCurrencyId;
      }
      if (this.destination.TourCategory != undefined && this.destination.TourCategory != "") {
        this.tourCatId = this._ArrayToStringService.StringToIntegerArrayConvert(this.destination.TourCategory);
      }
      if (this.destination.BestTimeToVisit != undefined && this.destination.BestTimeToVisit != "") {
        let btArray = this._ArrayToStringService.StringToIntegerArrayConvert(this.destination.BestTimeToVisit);
        if (btArray && btArray.length > 0) {
          this.fromMonthId = +btArray[0];
          this.toMonthId = +btArray[btArray.length - 1];
        }
      }
      // if (this.destination.HotelID != undefined && this.destination.HotelID != "") {
      //   this.hotelId = this._ArrayToStringService.StringToIntegerArrayConvert(this.destination.HotelID);
      // }

      //this.loading = false;
    }
  }

  NextDestination() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(2)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/images']);
  }

  BacktoDestination() {
    this._router.navigate(['tour/tourdestination']);
  }

  GetDestinationByID(dId: number) {
    this._destService.GetDestinationByID(dId).subscribe((data: any) => {
      this.destination = data.data[0];
    }, (error) => {
      console.log(error);
    });
  }

  GetTourtypeList() {
    this._tourTypeService.GetTourtypeList().subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          if (element.IsActive && element.IsActive == "True") {
            this.tourTypes.push(element);
          }
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  GetTourCategoryList() {
    this._tourCatService.GetTourtypeCateoryList().subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          if (element.IsActive && element.IsActive == "True") {
            this.tourCategories.push(element);
          }
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  GetCountryList() {
    this._countryService.GetCountryList().subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          if (element.IsActive && element.IsActive == 1) {
            this.countries.push(element);
          }
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  onCountryChange(countryvalue) {
    this.loading = true;
    let countryIdString = this._ArrayToStringService.ArrayToStringConvert(this.countryId);
    this.GetHotelList(countryIdString, "");
    //this.loading = false;
  }

  GetCurrencyList() {
    this._currencyService.GetCurrencyList().subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          if (element.IsActive && element.IsActive == 1) {
            this.currencies.push(element);
          }
          if (element.IsDefault && element.IsDefault == 1) {
            this.isDefaultCurrencyId = element.ID;
            if (this._commonService.destinationId <= 0) {
              this.currencyId = this.isDefaultCurrencyId;
            }

          }
        });
      }
      if (this._commonService.destinationId <= 0) {
        this.loading = false;
      }

    }, (error) => {
      console.log(error);
    });
  }

  GetHotelList(countryIdValues, hotelId: string) {
    this._hotelService.GetHotelListByCountry(countryIdValues).subscribe((data: any) => {
      this.hotels = data.data;
      // if (data.data && data.data.length > 0) {
      //   data.data.forEach(element => {
      //     if (element.IsActive) {
      //       this.hotels.push(element);
      //     }
      //   });
      // }
      if (hotelId && hotelId !== "") {
        this.hotelId = this._ArrayToStringService.StringToStringArrayConvert(hotelId);
      }
      else {
        this.hotelId = 0;
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  SaveDestinationForm() {
    this.destination.TourTypeID = this.tourId;
    this.destination.CurrencyID = this.currencyId;
    this.destination.TourCategory = this._ArrayToStringService.ArrayToStringConvert(this.tourCatId);
    this.destination.CountryID = this._ArrayToStringService.ArrayToStringConvert(this.countryId);
    this.destination.HotelID = this._ArrayToStringService.ArrayToStringConvert(this.hotelId);
    this.destination.IsActive = this.isActiveId;
    this.destination.BestTimeToVisit = this.GetMonthString(this.fromMonthId, this.toMonthId);
    this.destination.MetaDescription = "";
    this.destination.MetaKeywords = "";
    this.destination.MetaTitle = "";
    if (this.destination.TourTypeID <= 0) {
      alert('Please select tour type');
    }
    else if (this.destination.CurrencyID <= 0) {
      alert('Please select currency');
    }
    else if (this.destination.TourCategory == "") {
      alert('Please select atleast one tour category');
    }
    else if (this.destination.CountryID == "") {
      alert('Please select atleast one country');
    }
    else if (this.destination.HotelID == "") {
      alert('Please select atleast one hotel');
    }
    else if (this.destination.Priority <= 0) {
      alert('Please enter destination priority');
    }
    else if (this.destination.BestTimeToVisit == "0") {
      alert('Please select destination best time to visit');
    }
    else if (this.destination.DestinationName && this.destination.DestinationName.trim() === "") {
      alert('Destination name should not be blank.');
    }
    else if (this.destination.DestinationName && this.destination.DestinationName.length > 100) {
      alert('Destination name should not be more than 100 characters.');
    }
    else {
      this.loading = true;
      if (this._commonService.destinationId <= 0) {
        this._destService.InsertDestination(this.destination).subscribe((data: any) => {
          if (data.status == 200 || data.status == "200") {
            this.destination = data.data[0];
            this.destination.DestinationID = data.data[0].ID;
            this._commonService.destinationId = this.destination.DestinationID;
            this._destService.setter(data.data[0]);
            this.buttonName = "UPDATE";
            this.loading = false;
            $("#destinationNav li").removeClass("disabled");
            this.NextDestination();
          }
          else {
            this.destination.DestinationID = 0;
            this.buttonName = "ADD";
            this.loading = false;
            alert(data.message);
          }
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      } else {
        this._destService.UpdateDestination(this.destination).subscribe((data: any) => {
          if (data.status == 200 || data.status == "200") {
            this.destination = data.data[0];
            this.destination.DestinationID = data.data[0].ID;
            this._commonService.destinationId = this.destination.DestinationID;
            this._destService.setter(data.data[0]);
            this.buttonName = "UPDATE";
            this.loading = false;
            alert('destination updated successfully.');
          }
          else {
            this.loading = false;
            alert(data.message);
          }
        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      }
    }
  }

  GetMonthString(fromMonthNum: number, toMonthNum: number) {
    let monthValues: string = "";
    if (toMonthNum > fromMonthNum) {
      for (let index = fromMonthNum; index <= toMonthNum; index++) {
        monthValues += index + ",";
      }
      monthValues = monthValues.length > 0 ? monthValues.substring(0, monthValues.length - 1) : monthValues;
    }
    else if (toMonthNum < fromMonthNum) {
      for (let index = fromMonthNum; index <= 12; index++) {
        monthValues += index + ",";
      }
      for (let index = 1; index <= toMonthNum; index++) {
        monthValues += index + ",";
      }
      monthValues = monthValues.length > 0 ? monthValues.substring(0, monthValues.length - 1) : monthValues;
    }
    else {
      monthValues = fromMonthNum.toString();
    }
    return monthValues;
  }
}
