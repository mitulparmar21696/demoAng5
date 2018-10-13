import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FlightClass } from '../shared/flight-class.model';
import { FlightClassService } from '../shared/flight-class.service';

@Component({
  selector: 'app-flight-class-listing',
  templateUrl: './flight-class-listing.component.html',
  styleUrls: ['./flight-class-listing.component.css']
})
export class FlightClassListingComponent implements OnInit {

  listOfFlightClasses: FlightClass[] = [];
  flight = new FlightClass();
  selectedFlightClasses: FlightClass[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedflightClassString: string = "";
  nameId: any;
  actionStatus: boolean;
  checkedValue: any;
  loading:any;
  readonly defaultImageUrl = environment.DefaultImageTourtype;
  constructor(private _flightClassService: FlightClassService, 
              private _router: Router ) {   
                this.loading=false; 
  }

  ngOnInit() {
    this.loading=true;
    this.GetAllFlightClassesFromService();    
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedFlightClasses && this.selectedFlightClasses.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedFlightClasses.forEach(element => {
            this.selectedflightClassString += element.ID + ",";
          });
          this.selectedflightClassString = this.selectedflightClassString.length > 0 ? this.selectedflightClassString.substring(0, this.selectedflightClassString.length - 1) : ""
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = true;
            else
              this.actionStatus = false;
            this._flightClassService.ActionStatus(this.selectedflightClassString, this.actionStatus).subscribe((data: any) => {
              this.GetAllFlightClassesFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._flightClassService.ActionDelete(this.selectedflightClassString).subscribe((data: any) => {
              this.GetAllFlightClassesFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            alert('select valid action');
          }

          this.selectedflightClassString = "";
          this.nameId = -1;

        } 
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one flight type');
    }
  }

  GetFlightClassList() {
    this.GetAllFlightClassesFromService();
  }

  DeleteFlightClass(tt) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.DeleteFlightClassFromService(tt);
      this.GetAllFlightClassesFromService();
    }
    else {
        this.GetAllFlightClassesFromService();
      }
    
    
  }

  GetAllFlightClassesFromService() {
    this._flightClassService.GetFlightClassList().subscribe((data: any) => {
      //console.log(data.data);
      data.data.forEach(element => {
        element.IsActive = element.IsActive == "True" ? true : false;
        
        console.log(element.IsActive)
        this.imageExists(element.Image, function (exists) {
          if (!exists) {
            element.Image = environment.DefaultImageTourtype;
          }
        });
      });
      this._flightClassService.set_flightClasses(data.data);
      this.listOfFlightClasses = this._flightClassService.getFlightClasses();
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteFlightClassFromService(tt) {
    this._flightClassService.DeleteFlightClass(tt).subscribe((data: any) => {
      this.GetAllFlightClassesFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertFlightClass() {
    let flightClass = new FlightClass();
    this._flightClassService.setter(flightClass);
    this._router.navigate(['/manage/flight_class/form'])
  }


  UpdateFlightClass(tt) {
        this._flightClassService.setter(tt);
        this._router.navigate(['/manage/flight_class/form'])
    }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: FlightClass) {
    if (confirm('Are you sure to perform this action?') == true) {
      console.log(changeTo, ft);
        
           ft.IsActive = changeTo;
           this._flightClassService.UpdateFlightClass(ft).subscribe((success:any) => {
             this._flightClassService.setter(success.data);
             success.data.forEach(element => {
              element.IsActive = element.IsActive == "True" ? true : false;
              this.imageExists(element.Image, function (exists) {
                if (!exists) {
                  element.Image = environment.DefaultImageTourtype;
                }
              });
            });
            this._flightClassService.set_flightClasses(success.data);
            this.listOfFlightClasses = this._flightClassService.getFlightClasses();
           });
        }
        else 
        {
          this.GetAllFlightClassesFromService();
          console.log('dont do anything');
        }
      } 
}