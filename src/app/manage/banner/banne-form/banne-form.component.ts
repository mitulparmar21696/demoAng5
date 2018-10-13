import { Component, OnInit } from '@angular/core';
import { Banner, Destination, Package } from '../shared/banner.model';
import { BannerService } from '../shared/banner.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { CountryService } from '../../country/shared/country.service';
import { Country } from '../../country/shared/country.model';
import { StateService } from '../../state/shared/state.service';
import { State } from '../../state/shared/state.model';

@Component({
  selector: 'app-banne-form',
  templateUrl: './banne-form.component.html',
  styleUrls: ['./banne-form.component.css']
})
export class BanneFormComponent implements OnInit {
  private banner: Banner;

  selectedDropwdownValue: IsActive = new IsActive(true, 'Active');

  private buttonName: string = 'Add';

  private isClickedOnce: boolean = false;

  private isInvalidFile: boolean = false;

  private DropdownIsActiveList = [
    new IsActive(true, 'Active'),
    new IsActive(false, 'Inactive')
  ];
  destinationdiv = false;
  packagediv = false;
  formData = new FormData();
  destination: Destination[] = [];
  package: Package[] = [];
  
  
 
  private isActiveId: any;
  private ttId: any;
  private tttype: any;
  private ttdestination: any;
  private ttpackage: any;
  private ttbannerFor: any;
  selectedGame: Object = {};
  loading:any;
  constructor(private _ttService: BannerService,  private _stateService: StateService,   private _countryService: CountryService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.tttype = 0;
    this.ttdestination = 0;
    this.ttpackage = 0;
    this.ttbannerFor = 0;
    this.loading=false;
  
  }

 

  ngOnInit() {
    window.scrollTo(0, 0);
   
    // Getcountrywisestatelist
   this.banner = this._ttService.getter();
    if (this.banner.ID == undefined) {
      this.buttonName = 'Add';
      
    } else {
      this.tttype = this.banner.BannerTypeValue;
      if (this.banner.BannerTypeValue != '3') {
      if (this.banner.DestinationID != '0'){
        this.destinationdiv =true
        this.ttdestination = this.banner.DestinationID;
      }
      if (this.banner.PackageID != '0'){
        this.destinationdiv =true
        this.packagediv =true
        this.ttdestination = this.banner.DestinationID;
        this.ttpackage = this.banner.PackageID;
      }
    
      this._ttService.GetDestination().subscribe((data: any) => {
      
        this.destination = data.data;
        // this.ttpackage = 0;
        // this.tttype = 0;
      }, (error) => {
        console.log(error);
      });
      this._ttService.GetPackageList(this.banner.DestinationID).subscribe((data: any) => {
      
        this.package = data.data;
        // this.tttype = 0;
      }, (error) => {
        console.log(error);
      });
    }
      this.ttbannerFor = this.banner.BannerFor;
      this.buttonName = 'Update';
    }

    if (this.banner.IsActive !== undefined) {
      if (this.banner.IsActive == true) {
        this.isActiveId = true;
      } else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = 'banner';
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

  

  processForm() {
    this.isClickedOnce = true;
    this.loading=true;
    const bannerName = $('#BannerTitle').val().toString();
    
    if ($.trim(bannerName) === '') {
     this.banner.BannerTitle = '';
     this.loading=false;
      alert('Please add Banner Title.');
      
    } else {
      if (this.tttype === 0) {
        this.loading=false;
        this.banner.BannerType = '';
         alert('Please select type.');
       } else {
        if (this.ttbannerFor === 0) {
          this.loading=false;
          this.banner.BannerFor = '';
           alert('Please select Banner For.');
         } else {
          if (this.tttype === "1"){
            if (this.ttdestination === 0) {
              this.loading=false;
              this.banner.DestinationName = '';
               alert('Please select destination.');
              
             } else {
              this.banner.IsActive = this.isActiveId;
            
              if (this.banner.ID === undefined) {
               this.banner.BannerType =  this.tttype
               this.banner.DestinationID =  this.ttdestination
               this.banner.PackageID =  this.ttpackage
               this.banner.BannerFor =  this.ttbannerFor
                this._ttService.InsertBanner(this.banner).subscribe((tt: any) => {
                  if (tt.status === 200 || tt.status === '200') {
                    alert(tt.message);
                    this.UploadImageAfterInsert(tt.data[0].ID);
                    this._ttService.setbanners(tt.data);
                    // this.UploadImageAfterInsert(tt.data[0].ID);
                    this.loading=false;
                    this._router.navigate(['/manage/banner']);
                  } else {
                    this.loading=false;
                    alert('banner is already exist.');
                    console.log('banner is already exist.');
                  }
                }, (error) => {
                  this.loading=false;
                  console.log(error);
                });
              } else {
                this.banner.BannerType =  this.tttype
               this.banner.DestinationID =  this.ttdestination
               this.banner.PackageID =  this.ttpackage
               this.banner.BannerFor =  this.ttbannerFor
                this._ttService.UpdateBanner(this.banner).subscribe((tt: any) => {
                  // console.log(tt);
                  if (tt.status === 200 || tt.status === '200') {
                    alert(tt.message);
                    this.UploadImageAfterInsert(this.banner.ID);
                    this._ttService.setbanners(tt.data);
                    this.loading=false;
                    this._router.navigate(['/manage/banner']);
                  } else {
                    this.loading=false;
                    alert('banner is already exist.');
                    console.log('banner is already exist.');
                  }
                }, (error) => {
                  this.loading=false;
                  console.log(error);
                });
              }

             }
          } else if (this.tttype === "2"){
            if (this.ttdestination === 0) {
              this.banner.DestinationID = '';
              this.loading=false;
               alert('Please select destination.');
              
             } else {
              if (this.ttpackage === 0) {
                this.banner.PackageID = '';
                this.loading=false;
                 alert('Please select package.');
                
               } else {
                this.banner.IsActive = this.isActiveId;
            
                if (this.banner.ID === undefined) {
                 this.banner.BannerType =  this.tttype
                 this.banner.DestinationID =  this.ttdestination
                 this.banner.PackageID =  this.ttpackage
                 this.banner.BannerFor =  this.ttbannerFor
                  this._ttService.InsertBanner(this.banner).subscribe((tt: any) => {
                    if (tt.status === 200 || tt.status === '200') {
                      alert(tt.message);
                      this.UploadImageAfterInsert(tt.data[0].ID);
                      this._ttService.setbanners(tt.data);
                      this.loading=false;
                      // this.UploadImageAfterInsert(tt.data[0].ID);
                      this._router.navigate(['/manage/banner']);
                    } else {
                      this.loading=false;
                      alert('banner is already exist.');
                      console.log('banner is already exist.');
                    }
                  }, (error) => {
                    this.loading=false;
                    console.log(error);
                  });
                } else {
                  this.banner.BannerType =  this.tttype
                 this.banner.DestinationID =  this.ttdestination
                 this.banner.PackageID =  this.ttpackage
                 this.banner.BannerFor =  this.ttbannerFor
                  this._ttService.UpdateBanner(this.banner).subscribe((tt: any) => {
                    // console.log(tt);
                    if (tt.status === 200 || tt.status === '200') {
                      alert(tt.message);
                      this.UploadImageAfterInsert(this.banner.ID);
                      this._ttService.setbanners(tt.data);
                      this.loading=false;
                      this._router.navigate(['/manage/banner']);
                    } else {
                      this.loading=false;
                      alert('banner is already exist.');
                      console.log('banner is already exist.');
                    }
                  }, (error) => {
                    this.loading=false;
                    console.log(error);
                  });
                }

               }
      
             }
          }
          else{
            this.banner.IsActive = this.isActiveId;
            
              if (this.banner.ID === undefined) {
               this.banner.BannerType =  this.tttype
               this.banner.DestinationID =  this.ttdestination
               this.banner.PackageID =  this.ttpackage
               this.banner.BannerFor =  this.ttbannerFor
                this._ttService.InsertBanner(this.banner).subscribe((tt: any) => {
                  if (tt.status === 200 || tt.status === '200') {
                    alert(tt.message);
                    this.UploadImageAfterInsert(tt.data[0].ID);
                    this._ttService.setbanners(tt.data);
                    // this.UploadImageAfterInsert(tt.data[0].ID);
                    this.loading=false;
                    this._router.navigate(['/manage/banner']);
                  } else {
                    this.loading=false;
                    alert('banner is already exist.');
                    console.log('banner is already exist.');
                  }
                }, (error) => {
                  this.loading=false;
                  console.log(error);
                });
              } else {
                this.banner.BannerType =  this.tttype
               this.banner.DestinationID =  this.ttdestination
               this.banner.PackageID =  this.ttpackage
               this.banner.BannerFor =  this.ttbannerFor
                this._ttService.UpdateBanner(this.banner).subscribe((tt: any) => {
                  // console.log(tt);
                  if (tt.status === 200 || tt.status === '200') {
                    alert(tt.message);
                    this.UploadImageAfterInsert(this.banner.ID);
                    this._ttService.setbanners(tt.data);
                    this.loading=false;
                    this._router.navigate(['/manage/banner']);
                  } else {
                    this.loading=false;
                    alert('banner is already exist.');
                    console.log('banner is already exist.');
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

  BackToBanner() {
    this._router.navigate(['/manage/banner']);

  }

  UploadImageAfterInsert(id) {
    this._ttService.UploadImage(id, this.formData).subscribe((data: any) => {
      return data;
    }, (error) => {
      console.log(error);
    });
  }

  validateFile(name: String) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg'
      || ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'img') {
      return true;
    } else {
      return false;
    }
  }
  GetDestination(tttype: string) {
     const TypeID = tttype;
    //  this.tttyp
     if (TypeID == "1")
     {
    this.destinationdiv = true
    this.packagediv = false
      this._ttService.GetDestination().subscribe((data: any) => {
        this.ttpackage = 0;
        this.ttdestination= 0;
        this.destination = data.data;
       
        // this.tttype = 0;
      }, (error) => {
        console.log(error);
      });
    }
    else if (TypeID == "2") 
    {
      this.destinationdiv = true
      this.packagediv = true
      this._ttService.GetDestination().subscribe((data: any) => {
        this.ttpackage = 0;
        this.ttdestination= 0;
        this.destination = data.data;
        // this.tttype = 0;
      }, (error) => {
        console.log(error);
      });
    }
    else{
      this.destinationdiv = false
      this.packagediv = false
    }
  }
  GetPackage(tttype: string) {
    const TypeID = tttype;
   
  
     this._ttService.GetPackageList(tttype).subscribe((data: any) => {
      
        this.package = data.data;
        this.ttpackage = 0;
        // this.tttype = 0;
      }, (error) => {
        console.log(error);
      });
  
 }
}
