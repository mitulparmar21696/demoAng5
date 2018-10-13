import { Component, OnInit } from '@angular/core';
import { Hotel, City, Facility } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { CountryService } from '../../country/shared/country.service';
import { Country } from '../../country/shared/country.model';
import { StateService } from '../../state/shared/state.service';
import { State } from '../../state/shared/state.model';
@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  private hotel: Hotel;

  selectedDropwdownValue: IsActive = new IsActive(true, 'Active');

  private buttonName: string = 'Add';

  private isClickedOnce: boolean = false;

  private isInvalidFile: boolean = false;

  private DropdownIsActiveList = [
    new IsActive(true, 'Active'),
    new IsActive(false, 'Inactive')
  ];

  formData = new FormData();
  countries: Country[] = [];
  facility: Facility[] = [];
  state: State[] = [];
  city: City[] = [];
  private isActiveId: any;
  private ttId: any;
  private ttrating: any;
  private ttcountry: any;
  private ttstate: any;
  private ttcity: any;
  private ttfacility: any;

  private imageArray:any;
  private toSendObj:any;
  private countImage:any;
  private hotelDet:any;

  selectedGame: Object = {};
  loading:any;
  constructor(private _ttService: HotelService,  private _stateService: StateService,   private _countryService: CountryService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.ttId = 0;
    this.ttrating = 0;
    this.ttcountry = 0;
    this.ttstate = 0;
    this.ttcity = 0;
    this.ttfacility = 0;

    this.imageArray=[];
    this.hotelDet={};
    this.toSendObj={},
    this.countImage=0
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._countryService.Getlistingcountry().subscribe((data: any)=> {
      this.countries = data.data 
    })
    this._ttService.GetfacilityList().subscribe((data: any)=> {
      this.facility = data.data 
    })
   
    // Getcountrywisestatelist
   this.hotel = this._ttService.getter();
    if (this.hotel.ID == undefined) {
      this.buttonName = 'Add';
      
    } else {
      this.ttId = this.hotel.Star;
      this.ttrating = this.hotel.Rating;
      this.ttcountry = this.hotel.CountryID;
      this.ttstate = this.hotel.StateID;
      this.ttcity = this.hotel.CityID;

      this.imageArray=this.hotel.HotelImage 

      this._ttService.GetCountryWiseState(this.ttcountry).subscribe((data: any) => {
       
        this.state = data.data;
      }, (error) => {
        console.log(error);
      });
      this._ttService.Getstatewisecity(this.ttstate).subscribe((data: any) => {
    
        this.city = data.data;
      }, (error) => {
        console.log(error);
      });
      this.buttonName = 'Update';
    }
    if (this.hotel.IsActive !== undefined) {
      if (this.hotel.IsActive == true) {
        this.isActiveId = true;
      } else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = 'Hotel';
  }

  onChange(event) {
    const files = event.srcElement.files;

    if (!this.validateFile(files[0].name)) {

      this.isInvalidFile = true;
      return this.isInvalidFile;
    }
    this.isInvalidFile = false;
    this.formData.append('Data', files[0], files[0].name);
  }
  onFileChanged(files){
    this.imageArray=files.target.files;
    var urls=[];
    if (files) {
      
      for (let file of this.imageArray) {
        
        let reader = new FileReader();
        reader.onload = (e: any) => {
          
          file.isChecked=false;
          file.ImageName=e.target.result;
        }
        reader.readAsDataURL(file);
      }
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  processForm() {
    this.isClickedOnce = true;
    this.loading=true;
    const hotelName = $('#Name').val().toString();
    const Address = $('#Address').val().toString();
    const Mobile = $('#Mobile').val().toString();
    const Email = $('#Email').val().toString();
    if ($.trim(hotelName) === '') {
     this.hotel.Name = '';
     this.loading=false;
      alert('Please add Hotel name.');
    } else {

      if ($.trim(Address) === '') {
        this.loading=false;
        this.hotel.Address = '';
         alert('Please add Hotel Address.');
       } else {
        if ($.trim(Mobile) === '') {
          this.loading=false;
          this.hotel.Mobile = '';
           alert('Please add Hotel Mobile.');
         } else {
          if ($.trim(Email) === '') {
            this.loading=false;
            this.hotel.Email = '';
             alert('Please add Hotel Email.');
           } else {
            this.hotel.IsActive = this.isActiveId;
            
              if (this.hotel.ID === undefined) {
                this.hotel.Star = this.ttId;
                this.hotel.Rating = this.ttrating;
                this.hotel.CountryID = this.ttcountry;
                this.hotel.StateID = this.ttstate;
                this.hotel.CityID = this.ttcity;
                this._ttService.InsertHotel(this.hotel).subscribe((tt: any) => {
                  if (tt.status === 200 || tt.status === '200') {

                    tt.data.forEach(element => {
                      if(element.Name==this.hotel.Name){
                        this.hotelDet.hotelId=element.ID;
                        this.hotelDet.hotelName=this.hotel.Name;
                      }
                    });

                    alert(tt.message);
                    // this.UploadImageAfterInsert(tt.data[0].ID);
                    this.uploadImage();
                    // this._router.navigate(['/manage/hotel']);
                  } else {
                    this.loading=false;
                    alert('Hotel is already exist.');
                    console.log('Hotel is already exist.');
                  }
                }, (error) => {
                  this.loading=false;
                  console.log(error);
                });
              } else {
                this.hotel.Star = this.ttId;
                this.hotel.Rating = this.ttrating;
                this.hotel.CountryID = this.ttcountry;
                this.hotel.StateID = this.ttstate;
                this.hotel.CityID = this.ttcity;
                this._ttService.UpdateHotel(this.hotel).subscribe((tt: any) => {
                  // console.log(tt);
                  if (tt.status === 200 || tt.status === '200') {
                    alert(tt.message);
                    // this.UploadImageAfterInsert(this.hotel.ID);
                    this.uploadImage();
                    // this._router.navigate(['/manage/hotel']);
                  } else {
                    this.loading=false;
                    alert('Hotel is already exist.');
                    console.log('Hotel is already exist.');
                  }
                }, (error) => {
                  this.loading=false;
                  console.log(error);
                });
              }
            }
          }
        }
      }
    this.isClickedOnce = false;
  }

  uploadImage(){
    
    var array = this.imageArray[this.countImage];
    
    let forData:FormData = new FormData();
    // var forData= new FormData()
    forData.append('Data', array, array.name);
    this.toSendObj={
      Hotelid:this.hotelDet.hotelId,
      Name:this.imageArray[this.countImage].name,
      hotelName:this.hotelDet.hotelName,
      Ismain: 0,
      operationtype:'insert'
    }
    
    this._ttService.UploadHotelImage(this.toSendObj,forData).subscribe((data: any) => {
      
      this.countImage++
      if(this.imageArray.length > this.countImage){
        
        this.uploadImage()
      }else{
        this.loading=false;
        this._router.navigate(['/manage/hotel']);
      }
      // return data;
    }, (error) => {
      console.log(error);
    })
  }

  BackToHotel() {
    this._router.navigate(['/manage/hotel']);
  }

  // UploadImageAfterInsert(id) {
  //   this._ttService.UploadImage(id, this.formData).subscribe((data: any) => {
  //     return data;
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg'
      || ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'img') {
      return true;
    } else {
      return false;
    }
  }

  Getcountrywisestatelist(event) {
    this._ttService.GetCountryWiseState(event).subscribe((data: any) => {
    
      this.state = data.data;
      this.ttstate = 0;
      this.ttcity = 0;
    }, (error) => {
      console.log(error);
    });
  }
  Getstatewisecitylist(event) {
    this._ttService.Getstatewisecity(event).subscribe((data: any) => {
    
      this.city = data.data;
      this.ttcity = 0;
    }, (error) => {
      console.log(error);
    });
  }
}
