import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { ArrayToStringService } from '../../../shared/services/ArrayToString.service';
import { PackageimageService } from '../shared/packageimage.service';
import { Packageimage } from '../shared/packageimage.model';
import { PackageItineraryService } from '../shared/package-itinerary.service';
import { PackageIntinerary } from '../shared/package-intinerary.model';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'app-package-images',
  templateUrl: './package-images.component.html',
  styleUrls: ['./package-images.component.css']
})
export class PackageImagesComponent implements OnInit {

  private images: Packageimage[] = [];

  private localImages: OpImage[] = [];

  private itineraryIds: PackageIntinerary[] = [];

  private buttonName: string = "SAVE";

  private isClicked: boolean = false;

  private loading = false;

  constructor(private _router: Router
    , private _cService: CommonService
    , private _pimageService: PackageService
    , private _pService: PackageimageService
    , private _iService: PackageItineraryService
    , private _arrayService: ArrayToStringService
  ) { }

  ngOnInit() {
    this.loading = true;
    if (this._cService.packageId > 0) {
      this.GetItineraryData();
    }
    else {
      $(document).ready(function () {
        $("#packageNav li").removeClass("active");
        $("#packageNav li:nth-child(1)").addClass("active");
      });
      this._router.navigate(['packages/list/form/package']);
    }
  }

  //1 Get Itinerary Data
  GetItineraryData() {
    this._iService.GetItineraryList(this._cService.packageId).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        this.itineraryIds = data.data;
        // 2 Get Package Images
        this.GetPackageImages();
      }
      else {
        var answer = confirm('Please add itinerary first then you can add images');
        $(document).ready(function () {
          $("#packageNav li").removeClass("active");
          $("#packageNav li:nth-child(3)").addClass("active");
        });
        this._router.navigate(['packages/list/form/itinerary']);
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  GetPackageImages() {
    this._pimageService.PackageImageOperations(0, 0, this._cService.packageId, true, "listing").subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        this.images = data.data;
        // 3 Get Itinerary Images Now to check data is there in DB or not
        this.GetItineraryImages();
        // this.images.forEach(element => {
        //   let newImage = new OpImage();
        //   newImage.ImageID = element.ImageID;
        //   newImage.ImageName = element.ImageName;
        //   newImage.IsMain = element.IsMain;
        //   newImage.ItineraryID = element.ItineraryID;
        //   newImage.AltTag = element.AltTag;
        //   newImage.TitleTag = element.TitleTag;
        //   this.localImages.push(newImage);
        // });
      }
      else {
        var answer = confirm('Package images not added yet!');
        $(document).ready(function () {
          $("#packageNav li").removeClass("active");
          $("#packageNav li:nth-child(1)").addClass("active");
        });
        this._router.navigate(['packages/list/form/package']);
      }
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  //3
  GetItineraryImages() {
    this._pService.GetPackageImageList(this._cService.packageId).subscribe((data: any) => {
      if (data.data && data.data.length > 0) {
        //this.images = data.data;
        data.data.forEach(element => {
          let newImage = new OpImage();
          newImage.ID = element.ID;
          newImage.ImageID = element.ImageID;
          newImage.ImageName = element.ImageName;
          newImage.IsMain = (element.IsMain == undefined || !element.IsMain) ? false : true;
          newImage.ItineraryID = element.ItineraryID.toString();
          newImage.AltTag = element.AltTag;
          newImage.TitleTag = element.TitleTag;
          this.localImages.push(newImage);
        });
        //this.buttonName = "UPDATE";
      }
      else {
        this.images.forEach(element => {
          let newImage = new OpImage();
          newImage.ID = 0;
          newImage.ImageID = element.ImageID;
          newImage.ImageName = element.ImageName;
          newImage.IsMain = element.IsMain;
          newImage.ItineraryID = 0;
          newImage.AltTag = element.AltTag;
          newImage.TitleTag = element.TitleTag;
          this.localImages.push(newImage);
        });
        //this.buttonName = "ADD";
      }
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }



  SavePackageImages() {
    if (!this.isClicked) {
      this.loading = true;
      this.isClicked = true;
      var operationType: string = "insert";
      let invalidItineraryID: boolean = false;
      let sendArray: OpImageArray[] = [];
      this.localImages.forEach(element => {
        let objsendArray = new OpImageArray();
        objsendArray.ID = element.ID;
        objsendArray.ImageID = element.ImageID;
        objsendArray.ItineraryID = +element.ItineraryID;
        if (objsendArray.ItineraryID <= 0) {
          invalidItineraryID = true;
        }
        objsendArray.IsMain = element.IsMain === true ? "1" : "0";
        sendArray.push(objsendArray);
      });

      if (invalidItineraryID) {
        this.loading = false;
        alert('Please select day');
        this.isClicked = false;
      }
      else {
        this._pService.InsertPackageImage(sendArray, this._cService.packageId, operationType).subscribe((data: any) => {
          if (data.data && data.data.length > 0) {
            //this.localImages = data.data;
            this.localImages = [];
            this.GetItineraryData();
            alert('Photos added successfully.');
            this.isClicked = false;
          } else {
            this.loading = false;
          }

        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      }
    }
  }

  CancelItinerary() {
    this.loading = true;
    this.localImages = [];
    this.GetItineraryData();
  }

  PreviousPackageImages() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(3)").addClass("active");
    });
    this._router.navigate(['packages/list/form/itinerary']);
  }

  NextPackageImages() {
    $(document).ready(function () {
      $("#packageNav li").removeClass("active");
      $("#packageNav li:nth-child(5)").addClass("active");
    });
    this._router.navigate(['packages/list/form/packagehotel']);
  }

}

export class OpImage {
  ID: number;
  ImageID: number;
  ImageName: string;
  AltTag: string;
  TitleTag: string;
  ItineraryID: number;
  IsMain: boolean;
}

export class OpImageArray {
  ID: number;
  ImageID: number;
  ItineraryID: number;
  IsMain: string;
}

