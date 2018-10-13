import { Component, OnInit } from '@angular/core';
import { Attraction } from '../shared/attraction.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { environment } from '../../../../environments/environment';
import { AttractionService } from '../shared/attraction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attraction-listing',
  templateUrl: './attraction-listing.component.html',
  styleUrls: ['./attraction-listing.component.css']
})
export class AttractionListingComponent implements OnInit {

  attractions: Attraction[] = [];
  attraction = new Attraction();
  selectedAttractions: Attraction[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'Description', header: 'Description' },
    { field: 'Image', header: 'Image' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedAttractionString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;


  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _attractionService: AttractionService, 
              private _router: Router ) {
                this.loading=false;    
  }

  ngOnInit() {
    this.loading=true;
    this.GetAttractionListFromService();  
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedAttractions && this.selectedAttractions.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedAttractions.forEach(element => {
            this.selectedAttractionString += element.ID + ",";
          });
          this.selectedAttractionString = this.selectedAttractionString.length > 0 ? this.selectedAttractionString.substring(0, this.selectedAttractionString.length - 1) : ""
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._attractionService.ActionStatus(this.selectedAttractionString, this.actionStatus).subscribe((data: any) => {
              this.GetAttractionListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._attractionService.ActionDelete(this.selectedAttractionString).subscribe((data: any) => {
              this.GetAttractionListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            alert('select valid action');
          }

          this.selectedAttractionString = "";
          this.nameId = -1;

        } 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one attraction type');
    }
  }

  GetAttractionList() {
    this.GetAttractionListFromService();
  }

  DeleteAttraction(tt) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.DeleteAttractionFromService(tt);
      this.GetAttractionListFromService();
    }
    else {
        this.GetAttractionListFromService();
      }
    
    
  }

  GetAttractionListFromService() {
    this._attractionService.GetAttractionList().subscribe((data: any) => {
   
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourtype;
        //   }
        // });
      });
      this._attractionService.set_attractions(data.data);
      this.attractions = this._attractionService.getAttractions();
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteAttractionFromService(tt) {
    this._attractionService.DeleteAttraction(tt).subscribe((data: any) => {
      this.GetAttractionListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertAttraction() {
    let attraction = new Attraction();
    this._attractionService.setter(attraction);
    this._router.navigate(['/manage/attraction/form'])
  }


  UpdateAttraction(tt) {
        this._attractionService.setter(tt);
        this._router.navigate(['/manage/attraction/form'])

  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: Attraction) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      ft.IsActive = changeTo;
      this._attractionService.UpdateAttraction(ft).subscribe((success:any) => {
      this._attractionService.set_attractions(success.data);
      this.attractions = this._attractionService.getAttractions();       
    });
    }
      
    else 
      {
        this.GetAttractionListFromService();
      }
  }
}
