import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destinationphoto } from '../shared/destinationphoto.model';
import { CommonService } from '../shared/common.service';
import { DestinationphotoService } from '../shared/destinationphoto.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-destinationimage',
  templateUrl: './destinationimage.component.html',
  styleUrls: ['./destinationimage.component.css']
})
export class DestinationimageComponent implements OnInit {

  readonly defaultImageUrl = environment.DefaultImageTourtype;

  private buttonName: string = "ADD";

  private destinationImages: Destinationphoto[] = [];

  private dImage = new Destinationphoto();

  private selectedImages: Destinationphoto[];

  cols: any[] = [
    { field: 'ImageName', header: 'Image' },
    { field: 'ImageTitle', header: 'Title' },
    { field: 'IsMain', header: 'IsMain' }
  ];
  selectedFAQString: string = "";

  private isInvalidFile: boolean = false;

  private isAlreadyMain: boolean = false;

  formData = new FormData();

  private loading = false;

  // setter(d: Destinationphoto) {
  //   this.dImage = d;
  // }

  // getter() {
  //   return this.dImage;
  // }

  constructor(private _fService: DestinationphotoService, private _cService: CommonService
    , private _router: Router) { }

  ngOnInit() {
    if (this._cService.destinationId > 0) {
      this.loading = true;
      this.GetDestinationImageList();
    }
    else {
      $(document).ready(function () {
        $("#destinationNav li").removeClass("active");
        $("#destinationNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['tour/tourdestination/form/destination']);
    }
  }

  GetDestinationImageList() {
    this._fService.GetDestinationPhotoList(this._cService.destinationId).subscribe((data: any) => {
      this.destinationImages = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  SaveDestinationImageForm() {
    let operationType: string = "";
    if (this.dImage.Title && this.dImage.Title.trim() === "") {
      alert('Image title should not be blank');
    }
    else if (this.formData.get("Data") == null || this.formData.get("Data") == undefined) {
      alert('Please add image');
    }
    else {
      this.loading = true;
      if (this.dImage.ID == undefined) {
        operationType = "insert";
        this.dImage.ID = 0;
      }
      else {
        operationType = "update";
      }

      if (this.dImage.IsMain != undefined && this.dImage.IsMain && this.destinationImages && this.destinationImages.length > 0) {
        this.destinationImages.forEach(element => {
          let mainVal: any = element.IsMain;
          if (mainVal && mainVal == "1") {
            this.isAlreadyMain = true;
          }
        });
      }

      if (this.isAlreadyMain) {
        this.loading = false;
        alert('Main image already selected, Please deselect main image.');
        this.isAlreadyMain = false;
      }
      else {
        this._fService.UploadImage(this.dImage.ID, this.dImage.Title, this._cService.destinationId
          , this.dImage.IsMain, operationType, this.formData).subscribe((tt: any) => {
            if (tt.status == 200 || tt.status == "200") {
              this.GetDestinationImageList();
            }
            else {
              this.loading = false;
              alert('Destination image is alrady exist.');
            }
          }, (error) => {
            console.log(error);
            this.loading = false;
          });

        this.CancelForm();
      }
    }
  }

  DeleteImage(di: any) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.loading = true;
      this._fService.DeleteDestinationPhoto(di.ID, this._cService.destinationId).subscribe((data: any) => {
        this.GetDestinationImageList();
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
    }
  }

  onChange(event) {
    var files = event.srcElement.files;
    if (!this.validateFile(files[0].name)) {
      this.isInvalidFile = true;
      $(document).ready(function () {
        $("#flImage").val("");
      });
      return this.isInvalidFile;
    }
    this.isInvalidFile = false;
    this.formData.append('Data', files[0], files[0].name);
  }

  PreviousDImage() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(1)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/destination']);
  }

  NextDImage() {
    $(document).ready(function () {
      $("#destinationNav li").removeClass("active");
      $("#destinationNav li:nth-child(3)").addClass("active");
    });
    this._router.navigate(['tour/tourdestination/form/ieclusion']);
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

  CancelForm() {
    //this.loading = true;
    this.dImage = new Destinationphoto();
    this.formData = new FormData();
    this.isAlreadyMain = false;
    this.buttonName = "ADD";
    $(document).ready(function () {
      $("#flImage").val("");
    });
    //this.loading = false;
  }

  UpdateImage(di) {
    this.loading = true;
    this.dImage.ID = di.ID;
    this.dImage.Title = di.Title;
    this.dImage.IsMain = di.IsMain == "1" ? true : false;
    this.dImage.Image = di.Image;
    this.buttonName = "UPDATE";
    this.loading = false;
  }

}
