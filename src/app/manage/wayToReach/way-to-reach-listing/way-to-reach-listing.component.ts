import { Component, OnInit } from '@angular/core';
import { WayToReach } from '../shared/way-to-reach.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { WayToReachService } from '../shared/way-to-reach.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-way-to-reach-listing',
  templateUrl: './way-to-reach-listing.component.html',
  styleUrls: ['./way-to-reach-listing.component.css']
})
export class WayToReachListingComponent implements OnInit {

  wayToReachCollection: WayToReach[] = [];
  wayToReach = new WayToReach();
  selectedWtrs: WayToReach[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedWayToReachString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;


  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _wtrService: WayToReachService, 
              private _router: Router ) {
                this.loading=false;    
  }

  ngOnInit() {
    this.loading=true;
    this.GetWayToReachCollectionFromService();    
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedWtrs && this.selectedWtrs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedWtrs.forEach(element => {
            this.selectedWayToReachString += element.ID + ",";
          });
          this.selectedWayToReachString = this.selectedWayToReachString.length > 0 ? this.selectedWayToReachString.substring(0, this.selectedWayToReachString.length - 1) : ""
        
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._wtrService.ActionStatus(this.selectedWayToReachString, this.actionStatus).subscribe((data: any) => {
              this.GetWayToReachCollectionFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._wtrService.ActionDelete(this.selectedWayToReachString).subscribe((data: any) => {
              this.GetWayToReachCollectionFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedWayToReachString = "";
          this.nameId = -1;

        } 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one way to reach');
    }
  }

  GetWayToReachCollection() {
    this.GetWayToReachCollectionFromService();
  }

  DeleteWayToReach(wtr) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      this.DeleteWayToReachFromService(wtr);
      this.GetWayToReachCollectionFromService();
    }
    else {
        this.GetWayToReachCollectionFromService();
      }
    
    
  }

  GetWayToReachCollectionFromService() {
    this._wtrService.GetWayToReachCollection().subscribe((data: any) => {
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourType;
        //   }
        // });
      });
      this._wtrService.set_wayToReachCollection(data.data);
      this.wayToReachCollection = this._wtrService.getWayToReachCollection();
      this.loading=false;

    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteWayToReachFromService(tt) {
    this._wtrService.DeleteWayToReach(tt).subscribe((data: any) => {
      this.GetWayToReachCollectionFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertWayToReach() {
    let wayToReach = new WayToReach();
    this._wtrService.setter(wayToReach);
    this._router.navigate(['/manage/way_to_reach/form'])
  }


  UpdateWayToReach(wtr) {
    if (confirm('Are you sure to perform this action?') == true) {
        this._wtrService.setter(wtr);
        this._router.navigate(['/manage/way_to_reach/form'])
    }
    else {
        this.GetWayToReachCollectionFromService();
      }
  
    
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, wtr: WayToReach) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      wtr.IsActive = changeTo;
      this._wtrService.UpdateWayToReach(wtr).subscribe((success:any) => {
      this._wtrService.set_wayToReachCollection(success.data);
      this.wayToReachCollection = this._wtrService.getWayToReachCollection();
    });
    }
      
    else 
      {
        this.GetWayToReachCollectionFromService();
      }
  }
}
