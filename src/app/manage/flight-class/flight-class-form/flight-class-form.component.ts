import { Component, OnInit } from '@angular/core';
import { ActiveInactive, ListTrueFalse } from '../../facility-type/shared/active-inactive.model';
import { FlightClass } from '../shared/flight-class.model';
import { FlightClassService } from '../shared/flight-class.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { IsActive } from '../../../shared/models/dd-isactive/IsActive.model';

@Component({
  selector: 'app-flight-class-form',
  templateUrl: './flight-class-form.component.html',
  styleUrls: ['./flight-class-form.component.css']
})
export class FlightClassFormComponent implements OnInit {

  private flightClass: FlightClass ;

  selectedDropwdownValue: IsActive = new IsActive(true, 'Active');

  private buttonName: string = 'Add';

  private isClickedOnce: boolean = false;

  private isInvalidFile: boolean = false;

  private DropdownIsActiveList = [
    new IsActive(true, 'Active'),
    new IsActive(false, 'Inactive')
  ];

  formData = new FormData();

  private isActiveId: any;
loading:any;
  constructor(private _fcService: FlightClassService, private _router: Router, private _sharedHeaderService: HeaderVariableService) {
    this.isActiveId = true;
    this.loading=false;
    console.log(this.isActiveId)
  }

  ngOnInit() {
    window.scrollTo(0, 0);
   this.flightClass = this._fcService.getter();
    if (this.flightClass.ID == undefined) {
      this.buttonName = 'Add';
    } else {
      this.buttonName = 'Update';
    }
    if (this.flightClass.IsActive !== undefined) {
      if (this.flightClass.IsActive == true) {
        this.isActiveId = true;
      } else {
        this.isActiveId = false;
      }
    }
    this._sharedHeaderService.sharedHeaderString = 'Flight Class';
  }


  processForm() {
    this.isClickedOnce = true;
    this.loading=true;
    const flightClassName = $('#fcName').val().toString();
    if ($.trim(flightClassName) === '') {
      this.loading=false;
     this.flightClass.Name = '';
      alert('Please add flight class name.');
    } else {
     this.flightClass.IsActive = this.isActiveId;
     console.log(this.isActiveId)
     
      if (this.flightClass.ID === undefined) {

        this._fcService.InsertFlightClass(this.flightClass).subscribe((tt: any) => {
          if (tt.status === 200 || tt.status === '200') {
            
            this._fcService.set_flightClasses(tt.data);
            this.loading=false;
            this._router.navigate(['/manage/flight_class']);
          } else {
            this.loading=false;
            alert('Flight class is already exist.');
            console.log('Flight  class is already exist.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } else {
        this._fcService.UpdateFlightClass(this.flightClass).subscribe((tt: any) => {
          // console.log(tt);
          if (tt.status === 200 || tt.status === '200') {
            this._fcService.set_flightClasses(tt.data);
            this.loading=false;
            this._router.navigate(['/manage/flight_class']);
          } else {
            this.loading=false;
            alert('Flight class is already exist.');
            console.log('Flight class is already exist.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }
    this.isClickedOnce = false;
  }

  BackToFlightClass() {
    this._router.navigate(['/manage/flight_class']);

  }

}
