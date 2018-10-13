import { Component, OnInit } from '@angular/core';
import { Tourcategory } from '../shared/tourcategory.model';
import { TourcategoryService } from '../shared/tourcategory.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { TourtypeService } from '../../tourtype/shared/tourtype.service';
import { Tourtype } from '../../tourtype/shared/tourtype.model';

@Component({
  selector: 'app-tourcategory-form',
  templateUrl: './tourcategory-form.component.html',
  styleUrls: ['./tourcategory-form.component.css']
})
export class TourcategoryFormComponent implements OnInit {


  private tourCategory: Tourcategory;

  private tourTypeList: Tourtype[] = [];

  selectedDropwdownValue: IsActive = new IsActive(true, "Active");

  private buttonName: string = "Add";

  private isClickedOnce: boolean = false;

  private isInvalidFile: boolean = false;

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];

  formData = new FormData();

  private isActiveId: any;

  private ttId: any;

  private dataImage: any;
  loading:any;
  constructor(private _ttService: TourcategoryService, private _tService: TourtypeService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.ttId = 0;
    this.loading=false;
  }

  ngOnInit() {
    setTimeout(this.GetTourTypeList(),2000);
    this.tourCategory = this._ttService.getter();
    if (this.tourCategory.ID == undefined) {
      this.buttonName = "Add";
      this.ttId = 0;
    }
    else {
      this.buttonName = "Update";
      this.ttId = this.tourCategory.TourTypeID.toString();
    }
    if (this.tourCategory.IsActive != undefined) {
      if (this.tourCategory.IsActive == true) {
        this.isActiveId = true;
      }
      else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Tourtype Category";
  }

  GetTourTypeList() {
    this._tService.GetTourtypeList().subscribe((data: any) => {
      this.tourTypeList = data.data;
    }, (error) => {
      console.log(error);
    });
  }

  onChange(event) {
    var files = event.srcElement.files;
    //console.log(files);
    //check file is valid
    if (!this.validateFile(files[0].name)) {
      //console.log('Selected file format is not supported');
      this.isInvalidFile = true;
      return this.isInvalidFile;
    }
    this.isInvalidFile = false;
    this.formData.append('Data', files[0], files[0].name);
  }

  processForm() {
    this.isClickedOnce = true;
    this.loading=true;
    var tourCatName = $("#ttcName").val().toString();
    var tourTypeID = this.ttId;
    if ($.trim(tourCatName) == "") {
      this.tourCategory.Name = "";
      this.loading=false;
      alert('Please add tour category name.');
    }
    else if (!this.ttId && this.ttId <= 0) {
      this.ttId = 0;
      this.loading=false;
      alert('Please select tour type.');
    }
    else {
      this.tourCategory.IsActive = this.isActiveId;
      this.tourCategory.TourTypeID = this.ttId;
      if (this.tourCategory.ID == undefined) {
        this._ttService.InsertTourtypeCategory(this.tourCategory).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            setTimeout(this.UploadImageAfterInsert(tt.data[0].ID), 1500);
            if (this.dataImage) {
              tt.data[0].Image = this.dataImage;
            }
            this.loading=false;            
            this.BackToTourCategory();
          }
          else { 
            this.loading=false;          
            console.log('Tour category is alrady exist.');
            alert('Tour category is alrady exist.')
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } else {
        this._ttService.UpdateTourtypeCategory(this.tourCategory).subscribe((tt: any) => {
          // console.log(tt);
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(this.tourCategory.ID);
            if (this.dataImage) {
              tt.data[0].Image = this.dataImage;
            }
            this.loading=false;          
            this.BackToTourCategory();
          }
          else {
            this.loading=false;           
            alert('Tourtype Category is alrady exist.');
            console.log('Tourtype Category is alrady exist.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToTourCategory() {
    this.loading=false;
    this._router.navigate(['/tour/tourcategory']);
  }

  UploadImageAfterInsert(id) {
    this._ttService.UploadImage(id, this.formData).subscribe((data: any) => {
      this.dataImage = data.imagePath;
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

}
