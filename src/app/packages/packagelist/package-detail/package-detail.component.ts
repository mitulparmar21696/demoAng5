import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';
import { Destination } from '../../../tour/tourdestination/shared/destination.model';
import { DestinationService } from '../../../tour/tourdestination/shared/destination.service';
import { CommonService } from '../shared/common.service';
import { Destinationphoto } from '../../../tour/tourdestination/shared/destinationphoto.model';
import { DestinationphotoService } from '../../../tour/tourdestination/shared/destinationphoto.service';
import { Package } from '../shared/package.model';
import { PackageService } from '../shared/package.service';
import { ArrayToStringService } from '../../../shared/services/ArrayToString.service';
import { PackagePhoto } from '../shared/package-photo.model';
import { PackageImageOperations } from '../shared/package-image-operations.model';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {

  private isDiscount: boolean = false;

  private isPackageDate: boolean = false;

  private isGroupPackage: boolean = false;

  private display: boolean = false;

  private DropdownIsActiveList = [
    new IsActive(true, "Active"),
    new IsActive(false, "Inactive")
  ];
  private isActiveId: any;

  private destinations: Destination[] = [];
  private destinationId: any;


  private facilities: any[] = [];
  private facilityId: any;

  private DropdownDiscountTypeList = [
    new IsActive(true, "Rs"),
    new IsActive(false, "%")
  ];
  private isDiscountTypeId: any;

  private teNote: string = "";

  private teDescription: string = "";

  private destinationImages: Destinationphoto[] = [];

  private cols: any[] = [
    { field: 'Image', header: 'Image' },
    // { field: 'ImageTitle', header: 'Title' }
  ];

  private addImageCols: any[] = [
    { field: 'Image', header: 'Image' },
    { field: 'IsMain', header: 'Is Main' }
  ];

  private selectedImages: Destinationphoto[];

  private addedImages: PackagePhoto[] = [];
  private selectedAddImages: PackagePhoto[];

  private packageDetail: Package;

  private dummyPackageDetail: Package;

  private buttonName: string = "ADD";

  formData = new FormData();

  private isInvalidFile: boolean = false;

  private isImageSave: boolean = false;

  private localFixedDate: Date[];

  private isClicked: boolean = false;

  private loading = false;

  constructor(private _router: Router, private _destService: DestinationService
    , private _fService: DestinationphotoService
    , private _commonService: CommonService
    , private _packageService: PackageService
    , private _ArrayToStringService: ArrayToStringService) { }

  ngOnInit() {
    this.loading = true;
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(1)").addClass("active");
    });

    this.GetDestinationList();

    this.GetFacilityList(0, "", "", true, "listing");

    if (this._commonService.packageId <= 0) {
      this.packageDetail = new Package();
      this.isActiveId = true;
      this.facilityId = 0;
      this.isDiscountTypeId = false;
      this.destinationId = 0;
    }
    else {
      this.buttonName = "UPDATE";
      this.BindPackageDetails();
    }
  }

  // GetPackageDetails() {
  //   this._packageService.GetPackageByID(this._commonService.packageId, this._commonService.destinationId).subscribe((data: any) => {
  //     if (data.data && data.data.length > 0) {
  //       this.BindPackageDetails(data.data);
  //     }
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

  BindPackageDetails() {
    this.dummyPackageDetail = this._packageService.getter();
    if (this.dummyPackageDetail.FixedDate && this.dummyPackageDetail.FixedDate.length > 0) {
      this.localFixedDate = this._ArrayToStringService.StringofDatesToDateArrayConvert(this.dummyPackageDetail.FixedDate);
    }
    this.packageDetail = this.dummyPackageDetail;

    this._commonService.numberOfDays = this.packageDetail.Day;

    this.destinationId = this.packageDetail.DestinationID;

    this.isDiscount = this.packageDetail.IsDiscount;
    if (this.packageDetail.IsFixedDate) {
      this.isPackageDate = this.packageDetail.IsFixedDate;
    }
    this.isGroupPackage = this.packageDetail.IsGroupPackage;
    if (this.packageDetail.IsRupees != undefined && this.packageDetail.IsRupees == true) {
      this.isDiscountTypeId = true;
    } else {
      this.isDiscountTypeId = false;
    }

    if (this.packageDetail.FacilityID != undefined && this.packageDetail.FacilityID != "") {
      this.facilityId = this._ArrayToStringService.StringToStringArrayConvert(this.packageDetail.FacilityID);
    }
    this.teNote = this.packageDetail.Notes;
    this.teDescription = this.packageDetail.Description;
    if (this.packageDetail.IsActive != undefined) {
      if (this.packageDetail.IsActive == true) {
        this.isActiveId = true;
      }
      else {
        this.isActiveId = false;
      }
    }

    this.PackageImageOp(0, 0, this._commonService.packageId, true, "listing");
  }

  GetDestinationList() {
    this._destService.GetDestinationList().subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          if (element.IsActive == 1) {
            this.destinations.push(element);
          }
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  GetFacilityList(id, name, description, isActive, operationType) {
    this._packageService.GetFacility(id, name, description, isActive, operationType).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        data.data.forEach(element => {
          if (element.IsActive == "1") {
            this.facilities.push(element);
          }
        });
      }
      if (this._commonService.packageId <= 0) {
        this.loading = false;
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  onDiscountChange(eve: any) {
    this.isDiscount = !this.isDiscount;
  }

  onPackageDateChange(eve: any) {
    this.isPackageDate = !this.isPackageDate;
  }

  showDialog() {
    if (this.destinationId > 0) {
      this._fService.GetDestinationPhotoList(this.destinationId).subscribe((data: any) => {
        this.destinationImages = data.data;
      }, (error) => {
        console.log(error);
      });
      this.display = true;
    }
    else {
      alert('Please select destination to add images');
      this.display = false;
    }
  }

  SavePackageDetails() {
    if (!this.isClicked) {
      this.isClicked = true;
      if (this.packageDetail.Discount === undefined) {
        this.packageDetail.Discount = 0;
      }
      if (this.packageDetail.MinAmountPaid === undefined) {
        this.packageDetail.MinAmountPaid = 0;
      }
      this.packageDetail.DestinationID = this.destinationId;
      this.packageDetail.FacilityID = this._ArrayToStringService.ArrayToStringConvert(this.facilityId);
      this.packageDetail.Notes = this.teNote;
      this.packageDetail.Description = this.teDescription;
      if (this.isActiveId === true || this.isActiveId === 1) {
        this.packageDetail.IsActive = true;
      }
      else {
        this.packageDetail.IsActive = false;
      }
      let localDiscount: any = this.isDiscount;
      if (localDiscount === true || localDiscount === 1) {
        this.packageDetail.IsDiscount = true;
      }
      else {
        this.packageDetail.IsDiscount = false;
      }
      if (this.packageDetail.IsDiscount) {
        this.packageDetail.IsRupees = this.isDiscountTypeId;
      }
      if (this.localFixedDate && this.localFixedDate.length > 0) {
        this.packageDetail.FixedDate = this.GetArrayofDatesToString(this.localFixedDate);
      }
      else {
        this.packageDetail.FixedDate = "";
      }
      let localFixedDate: any = this.isPackageDate
      if (localFixedDate === true || localFixedDate === 1) {
        this.packageDetail.IsFixedDate = true;
      }
      else {
        this.packageDetail.IsFixedDate = false;
      }
      let localGroupPackage: any = this.isGroupPackage;
      if (localGroupPackage === true || localGroupPackage === 1) {
        this.packageDetail.IsGroupPackage = true;
      }
      else {
        this.packageDetail.IsGroupPackage = false;
      }
      if (this.packageDetail.PackageName && this.packageDetail.PackageName.trim() === "") {
        this.packageDetail.PackageName = this.packageDetail.PackageName.trim();
        alert('Please enter valid package name');
        this.isClicked = false;
      }
      else if (this.packageDetail.Discount && this.packageDetail.Discount <= 0) {
        this.packageDetail.Discount = 0;
        alert('Please enter only positive discount amount');
        this.isClicked = false;
      }
      else if (this.packageDetail.MinAmountPaid && this.packageDetail.MinAmountPaid <= 0) {
        this.packageDetail.MinAmountPaid = 0;
        alert('Please enter only positive amount');
        this.isClicked = false;
      }
      else if (this.packageDetail.FacilityID == undefined || this.packageDetail.FacilityID.trim() == "") {
        this.packageDetail.FacilityID = "";
        alert('Please select package facilities');
        this.isClicked = false;
      }
      else if (this.packageDetail.IsFixedDate == undefined || !this.packageDetail.IsFixedDate) {
        this.packageDetail.IsFixedDate = false;
        alert('Please select package date');
        this.isClicked = false;
      }
      else {
        this.loading = true;
        if (this._commonService.packageId <= 0) {
          this._packageService.InsertPackage(this.packageDetail).subscribe((data: any) => {
            if (data.status == 200 || data.status == "200") {
              // this.packageDetail = data.data[0];
              // this.packageDetail.ID = data.data[0].ID;
              //this._packageService.setter(data.data[0]);
              this._commonService.packageId = data.data[0].ID;
              this._commonService.numberOfDays = data.data[0].Day;
              if (this.isImageSave) {
                this.isImageSave = false;
                this.UploadImageAfterInsert(data.data[0], this._commonService.packageId, "insert");
              }
              else {
                this._packageService.setter(data.data[0]);
                this.InsertPackageImages();
              }
            }
            else {
              this.packageDetail.ID = 0;
              this.buttonName = "ADD";
              alert('Package Details not saved.');
              this.loading = false;
            }
          }, (error) => {
            console.log(error);
            this.loading = false;
          });
        } else {
          this._packageService.UpdatePackage(this.packageDetail).subscribe((data: any) => {
            if (data.status == 200 || data.status == "200") {
              //this._packageService.setter(data.data[0]);
              this._commonService.packageId = data.data[0].ID;
              this._commonService.numberOfDays = data.data[0].Day;
              if (this.isImageSave) {
                this.isImageSave = false;
                this.UploadImageAfterUpdate(data.data[0], this._commonService.packageId, "insert");
              }
              else {
                this._packageService.setter(data.data[0]);
                this.DeleteInsertPackageImages();
              }
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
      //this.isClicked = false;
    }
  }

  AddImagesToPackage() {
    if (this.selectedImages && this.selectedImages.length > 0) {
      this.selectedImages.forEach(element => {
        var localElement = new PackagePhoto(0, element.ID, this._commonService.packageId
          , element.Title, element.IsMain, element.Image);
        if (this.addedImages && this.addedImages.length > 0) {
          if (!this.addedImages.find(x => x.ImageID == element.ID))
            this.addedImages.push(localElement);
        }
        else {
          this.addedImages.push(localElement);
        }
      });
    }
    this.display = false;
    this.destinationImages = [];
  }

  DeleteAddedImage(di) {
    if (this.addedImages && this.addedImages.length > 0) {
      this.loading = true;
      const index: number = this.addedImages.indexOf(di);
      if (index !== -1) {
        //this.addedImages.splice(index, 1);
        //if (this.addedImages && this.addedImages.length > 0) {
        this.PackageImageOp(di.ID, di.ImageID, this._commonService.packageId, di.IsMain, "delete");
        //}
      }
    }
  }

  UploadImageAfterInsert(pkg: any, id, operationType: string) {
    this._packageService.UploadPackageDocumentImage(id, operationType, this.formData).subscribe((data: any) => {
      if (data.status == 200 && data.ImagePath && data.ImagePath != "") {
        pkg.PackageImage = data.ImagePath;
        this._packageService.setter(pkg);
      }
      else {
        this._packageService.setter(pkg);
      }
      this.InsertPackageImages();
    }, (error) => {
      console.log(error);
    });
  }

  UploadImageAfterUpdate(pkg: any, id, operationType: string) {
    this._packageService.UploadPackageDocumentImage(id, operationType, this.formData).subscribe((data: any) => {
      if (data.status == 200 && data.ImagePath && data.ImagePath != "") {
        pkg.PackageImage = data.ImagePath;
        this._packageService.setter(pkg);
      }
      else {
        this._packageService.setter(pkg);
      }
      this.DeleteInsertPackageImages();
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  InsertPackageImages() {
    if (this.addedImages && this.addedImages.length > 0) {
      //this.PackageImageOp(0, element.ImageID, this._commonService.packageId, element.IsMain, "insert");
      let piOperations: PackageImageOperations[] = [];
      this.addedImages.forEach(element => {
        let pio = new PackageImageOperations(0, element.ImageID, this._commonService.packageId, element.IsMain, "insert");
        piOperations.push(pio);
      });
      this.PackageImageOpMultipleAfterInsert(piOperations);
    }
  }

  DeleteInsertPackageImages() {
    if (this.addedImages && this.addedImages.length > 0) {
      this._packageService.PackageImageOperations(this.addedImages[0].ID
        , this.addedImages[0].ImageID, this._commonService.packageId, this.addedImages[0].IsMain, "deleteall").subscribe((data: any) => {
          let piOperations: PackageImageOperations[] = [];
          this.addedImages.forEach(element => {
            let pio = new PackageImageOperations(0, element.ImageID, this._commonService.packageId, element.IsMain, "insert");
            piOperations.push(pio);
          });
          this.PackageImageOpMultipleAfterUpdate(piOperations);
        }, (error) => {
          console.log(error);
        });
    }

  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg'
      || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'img' || ext.toLowerCase() == 'pdf') {
      return true;
    }
    else {
      return false;
    }
  }

  onChange(event) {
    var files = event.srcElement.files;
    //console.log(files);
    //check file is valid
    if (!this.validateFile(files[0].name)) {
      //console.log('Selected file format is not supported');
      this.isInvalidFile = true;
      $(document).ready(function () {
        $("#flImage").val("");
      });
      return this.isInvalidFile;
    }
    this.isInvalidFile = false;
    this.formData.append('Data', files[0], files[0].name);
    this.isImageSave = true;
  }

  PackageImageOpMultipleAfterInsert(piOpearions: PackageImageOperations[]) {
    this._packageService.MultiplePackageOperations(piOpearions).subscribe(responseList => {
      this.loading = false;
      this.buttonName = "UPDATE";
      $("#packageNav li").removeClass("disabled");
      this.NextPackageDetail();
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  PackageImageOpMultipleAfterUpdate(piOpearions: PackageImageOperations[]) {
    this._packageService.MultiplePackageOperations(piOpearions).subscribe(responseList => {
      this.BindPackageDetails();
      this.buttonName = "UPDATE";
      alert('package updated successfully.');
      this.isClicked = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  PackageImageOp(id: number, imageId: number, packageId: number, isMain: boolean, operationType: string) {
    this._packageService.PackageImageOperations(id, imageId, packageId, isMain, operationType).subscribe((data: any) => {
      if (data && data.data && data.data.length > 0) {
        this.addedImages = data.data;
      }
      else {
        this.addedImages = [];
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  GetArrayofDatesToString(fixedDateArray) {
    if (fixedDateArray && fixedDateArray.length > 0) {
      return this._ArrayToStringService.DateArrayToStringofDateConvert(fixedDateArray);
    }
  }

  GetStringofDatesToArrayString(fixedDateString) {
    if (fixedDateString && fixedDateString.length > 0) {
      return this._ArrayToStringService.StringofDatesToDateArrayConvert(fixedDateString);
    }
  }

  NextPackageDetail() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(2)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagerate']);
  }

  BacktoPackage() {
    this._commonService.packageId = 0;
    this._commonService.destinationId = 0;
    this._commonService.numberOfDays = 0;
    this._router.navigate(['packages/list']);
  }

}
