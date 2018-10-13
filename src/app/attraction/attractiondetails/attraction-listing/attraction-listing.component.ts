import { Component, OnInit, ViewChild } from '@angular/core';
import { Attraction } from '../shared/attraction.model';
import { AttractionService } from '../shared/attraction.service';
import { AleartService } from '../../../core/service/alert.service';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-attraction-listing',
  templateUrl: './attraction-listing.component.html',
  styleUrls: ['./attraction-listing.component.css']
})
export class AttractionListingComponent implements OnInit {

  attractions: Attraction[] = [];
  selectedTTs: Attraction[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
   cols: any[] = [
    { field: 'AttractionType', header: 'Attraction Type' },
    { field: 'City', header: 'City Name' },
    { field: 'AttractionName', header: 'Attraction Name' },
  
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' },
  ];
  selectedAttractionString: string = "";
  nameId: any;
  actionStatus: boolean;

  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _ttService: AttractionService, private _router: Router, private  alert: AleartService) {    
  this.loading=false;
  }


  ngOnInit() {
    this.loading=true;
    this.GetAttractionList();    
    this.nameId = '1';
  }
  CustomAction() {
    //console.log(this.nameId);
    // if( this.selectedFTs == null) {
    //   this.aleart.showError("please select the values where you want changes!")
    // }
    if (this.nameId && this.selectedTTs && this.selectedTTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
          this.selectedTTs.forEach(element => {
            this.selectedAttractionString += element.ID + ",";
          });
          this.selectedAttractionString = this.selectedAttractionString.length > 0 ? this.selectedAttractionString.substring(0, this.selectedAttractionString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = true;
            else
              this.actionStatus = false;
            this._ttService.ActionStatus(this.selectedAttractionString, this.actionStatus).subscribe((data: any) => {
              this.GetAttractionListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ttService.ActionDelete(this.selectedAttractionString).subscribe((data: any) => {
              this.GetAttractionListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedAttractionString = "";
          this.nameId = -1;

        } //if ends 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
     
    }

    else {
      alert('Please select atleast one Attraction');
    }
  }
 

  GetAttractionList() {
    this.GetAttractionListFromService();
  }

  DeleteAttraction(tt) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.DeleteAttractionFromService(tt);
      this.GetAttractionListFromService();
    }
  }

  GetAttractionListFromService() {
    this._ttService.GetAttractionList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        this.imageExists(element.Image, function (exists) {
          if (!exists) {
            element.Image = environment.DefaultImageTourtype;
          }
        });
      });
      this.attractions = data.data;
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteAttractionFromService(tt) {
    this._ttService.DeleteAttraction(tt).subscribe((data: any) => {
      this.GetAttractionListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertAttraction() {
    let attraction = new Attraction();
    this._ttService.setter(attraction);
    this._router.navigate(['/attraction/attractiondetails/form'])
  }


  UpdateAttraction(tt) {
    this._ttService.setter(tt);
    this._router.navigate(['/attraction/attractiondetails/form'])
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }
  Status(changeTo, ft: Attraction) {
    if (confirm('Are you sure to perform this action?') == true) {
      
        console.log(changeTo, ft);
         ft.IsActive = changeTo;
     
          if (changeTo == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          this._ttService.SubActionStatus(ft, this.actionStatus).subscribe((data: any) => {
            this.GetAttractionListFromService();
          }, (error) => {
            console.log(error);
          });
        
      
    }
    else{
      this.GetAttractionListFromService();
    }
    
    

    
  }

}
