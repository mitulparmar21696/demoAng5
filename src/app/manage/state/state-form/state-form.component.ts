import { Component, OnInit } from '@angular/core';
import { State } from '../shared/state.model';
import { ActiveInactive } from '../../facility-type/shared/active-inactive.model';
import { StateService } from '../shared/state.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import { CountryService } from '../../country/shared/country.service';
import { Country } from '../../country/shared/country.model';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.css']
})
export class StateFormComponent implements OnInit {
  isClicked: boolean = false;
   state: State;
  selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
  //  facilites: FacilityType[];
   buttonName: string = "Add";

   isClickedOnce: boolean = false;

   isInvalidFile: boolean = false;

   DropdownIsActiveList = [
    new ActiveInactive(1, "Active"),
    new ActiveInactive(0, "Inactive")
  ];

   countries: Country[] = [];
   isActiveId: any;
  countryValue: number;
  loading:any;
  constructor(private _stateService: StateService, 
    private _router: Router, 
    private _sharedHeaderService: HeaderVariableService,
    private _countryService: CountryService) {
    this.isActiveId = 1;
    this.loading=false;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._countryService.GetActiveCountryList().subscribe((data: any)=> {
      this.countries = data.data 
    })
    this.state = this._stateService.get_state();
    if (this.state.ID == undefined) {
      this.buttonName = "Add";
      this.countryValue = 0;
      this.isInvalidFile = true;
    }
    else {
      this.buttonName = "Update";
      this.countryValue = this.state.countryID;
    }
    if (this.state.IsActive != undefined) {
      if (this.state.IsActive == 1) {
        this.isActiveId = 1;
      }
      else {
        this.isActiveId = 0;
      }
    }
    this._sharedHeaderService.sharedHeaderString = "State";
  }

  processForm() {
    this.loading=true;
    var stateName = $("#stateName").val().toString();
    if ($.trim(stateName) == "") {
      this.state.Name = "";
      this.loading=false;
      alert('Please add state name');
    }
  
    this.isClickedOnce = true;
      this.state.IsActive = this.isActiveId.toString();
      this.state.countryID = this.countryValue;
      
      if (this.state.ID == undefined) {
        this._stateService.InsertState(this.state).subscribe((state: any) => {
          if (state.status == 200 || state.status == '200') {

             this._stateService.set_states(state.data);
             this.state = this._stateService.get_state();
             alert("State has been added successfully")
             this.loading=false;
             this._router.navigate(['/manage/state']);
          }
          else {
            this.loading=false;
            alert('State already exists.');
          }          
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      } 
      else {
        this._stateService.UpdateState(this.state).subscribe((state: any) => {
          if (state.status == 200 || state.status == '200') {
            
            this._stateService.set_states(state.data);
            alert( 'State updated successfully');
            this.loading=false;
            this._router.navigate(['/manage/state']);
          }
          else {
            this.loading=false;
            alert('State already exists.');
          }
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    this.isClickedOnce = false;
  }

  BackToState() {
    this._router.navigate(['/manage/state']);
  }

  shouldBe($event) {
    this.isClicked = true;
    this.isInvalidFile = false;
  }
}
