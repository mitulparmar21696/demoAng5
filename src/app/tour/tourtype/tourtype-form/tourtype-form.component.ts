import { Component, OnInit } from '@angular/core';
import { Tourtype } from '../shared/tourtype.model';
import { TourtypeService } from '../shared/tourtype.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';

@Component({
  selector: 'app-tourtype-form',
  templateUrl: './tourtype-form.component.html',
  styleUrls: ['./tourtype-form.component.css']
})
export class TourtypeFormComponent implements OnInit {

  private tourType: Tourtype;

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
  loading:any;
  constructor(private _ttService: TourtypeService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.loading=false;
  }

  ngOnInit() {
    this.tourType = this._ttService.getter();
    if (this.tourType.ID == undefined) {
      this.buttonName = "Add";
    }
    else {
      this.buttonName = "Update";
    }
    if (this.tourType.IsActive != undefined) {
      if (this.tourType.IsActive == true) {
        this.isActiveId = true;
      }
      else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "Tour Type";
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

  // onSelect(IsActiveIds) {
  //   this.selectedDropwdownValue = null;
  //   for (var i = 0; i < this.DropdownIsActiveList.length; i++) {
  //     if (this.DropdownIsActiveList[i].id == IsActiveIds) {
  //       this.selectedDropwdownValue = this.DropdownIsActiveList[i];
  //     }
  //   }
  // }

  processForm() {
    this.loading=true;
    this.isClickedOnce = true;
    var tourtypeName = $("#ttName").val().toString();    
    if ($.trim(tourtypeName) == "") {
      this.tourType.Name = "";
      this.loading=false;
      alert('Please add tour type name.');
    }
    else {
      this.tourType.IsActive = this.isActiveId;
      if (this.tourType.ID == undefined) {
        this._ttService.InsertTourtype(this.tourType).subscribe((tt: any) => {
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(tt.data[0].ID);
            this.loading=false;
            this.BackToTourType();
          }
          else {
            this.loading=false;
            alert('Tour type is alrady exist.');
            console.log('Tour type is alrady exist.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } else {
        this._ttService.UpdateTourtype(this.tourType).subscribe((tt: any) => {
          // console.log(tt);
          if (tt.status == 200 || tt.status == "200") {
            this.UploadImageAfterInsert(this.tourType.ID);
            this.loading=false;
            this.BackToTourType();
          }
          else {
            this.loading=false;
            alert('Tour type is alrady exist.');
            console.log('Tour type is alrady exist.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToTourType() {
    this.loading=false;
    this._router.navigate(['/tour/tourtype']);
  }

  UploadImageAfterInsert(id) {
    this._ttService.UploadImage(id, this.formData).subscribe((data: any) => {
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

}
