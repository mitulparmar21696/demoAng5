import { Component, OnInit, ViewChild } from '@angular/core';
import { Attraction } from '../shared/attraction.model';
import { ActiveInactive } from '../../facility-type/shared/active-inactive.model';
import { AttractionService } from '../shared/attraction.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';

@Component({
  selector: 'app-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.css']
})
export class AttractionFormComponent implements OnInit {

  @ViewChild('attractionImage')
  attractionImage: any;

   attraction: Attraction;

  selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
  //  facilites: FacilityType[];
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

  constructor(private _attractionService: AttractionService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.attraction = this._attractionService.getter();
    if (this.attraction.ID == undefined) {
      this.buttonName = "Add";
    }
    else {
      this.buttonName = "Update";
    }
    if (this.attraction.IsActive != undefined) {
      if (this.attraction.IsActive == 1) {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Attraction Type";
  }

  onChange(event) {
    
    var files = event.srcElement.files;
    if( files[0].type  == 'image/png' ||  files[0].type == 'image/jpg'  ||  files[0].type == 'image/jpeg') {
      this.isInvalidFile = false;
      this.formData.append('Data', files[0], files[0].name);    
    }
    else {
      alert("Only Image files can be uploaded");
      this.resetImage();
      this.isInvalidFile = true;
      return this.isInvalidFile;
      
    }

  }


  processForm() {
    this.loading=true;
    this.isClickedOnce = true;
    var attractionName = $("#attractionName").val().toString();    
    if ($.trim(attractionName) == "") {
      this.attraction.Name = "";
      this.loading=false;
      alert('Please add attraction type name');
    }
    else {
      this.attraction.IsActive = this.isActiveId;

      if (this.attraction.ID == undefined) {
        this._attractionService.InsertAttraction(this.attraction).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(tt.data[0].ID);

             alert("Attraction Type added successfully");

             this._attractionService.set_attractions(tt.data);
             this.loading=false;
            this._router.navigate(['/manage/attraction']);
          }
          else {
            this.loading=false;
            alert('Attraction type already exists.');
          }
        }, (error) => {
          this.loading=false;
        });
      } 
      else {
        this._attractionService.UpdateAttraction(this.attraction).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(this.attraction.ID);
            
            alert( "Attraction Type updated successfully");

            this._attractionService.set_attractions(tt.data);
            this.loading=false;

            this._router.navigate(['/manage/attraction']);
          }
          else {
            this.loading=false;
            alert('Attraction Type already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToAttraction() {
    this._router.navigate(['/manage/attraction']);
  }

  UploadImageAfterInsert(id) {
    this._attractionService.UploadImage(id, this.formData).subscribe((data: any) => {
      return data;
    }, (error) => {
      console.log(error);
    })
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg'
      || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'img') {
      return true;
    }
    else {
      return false;
    }
  }

  resetImage() {
    console.log(this.attractionImage.nativeElement.files);
    this.attractionImage.nativeElement.value = "";
    console.log(this.attractionImage.nativeElement.files);
}

}
