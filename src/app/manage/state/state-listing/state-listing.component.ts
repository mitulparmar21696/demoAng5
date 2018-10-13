import { Component, OnInit } from '@angular/core';
import { State } from '../shared/state.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { StateService } from '../shared/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-state-listing',
  templateUrl: './state-listing.component.html',
  styleUrls: ['./state-listing.component.css']
})
export class StateListingComponent implements OnInit {
  
  states: State[] = [];
  state = new State();
  selectedstates: State[]= [];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Country', header: 'Country' },
    { field: 'State', header: 'State' },
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedStatesString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;
  loading:any;
  constructor(private _stateService: StateService, 
              private _router: Router) {
                this.loading=false;    
}
  ngOnInit() {
    this.loading=true;
    this.GetStatesListFromService(); 
    this.nameId = '1';
  }

CustomAction() {
  if (this.nameId && this.selectedstates && this.selectedstates.length > 0) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      this.selectedstates.forEach(element => {
      this.selectedStatesString += element.ID + ",";
        });
        this.selectedStatesString = this.selectedStatesString.length > 0 ? this.selectedStatesString.substring(0, this.selectedStatesString.length - 1) : ""
      
        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = "Active";
          else
            this.actionStatus = "Inactive";
          this._stateService.ActionStatus(this.selectedStatesString, this.actionStatus).subscribe((data: any) => {
            this.GetStatesListFromService();
          }, (error) => {
            console.log(error);
          });
        }
        
        else if (this.nameId == 3) {
          this._stateService.ActionDelete(this.selectedStatesString).subscribe((data: any) => {
            this.GetStatesListFromService();
          }, (error) => {
            console.log(error);
          });
        }

        else {
          console.log('select valid action');
        }

        this.selectedStatesString = "";
        this.nameId = -1;

      } //if ends 
      else {
       console.log('nothing should happen')
      }
      this.nameId = '1';
    
  }

  else {
    alert('Please select atleast one state');
  }
}


  GetStatesList() {
    this.GetStatesListFromService();
  }

  DeleteState(state) {
    if (confirm('Are you want to delete?') == true) {
      this.DeleteStateFromService(state);
      this.GetStatesListFromService();
    } 
    else {
        this.GetStatesListFromService();
    }

  }

  GetStatesListFromService() {
    this._stateService.GetStateList().subscribe((data: any) => {
      
      console.log(data);
      this._stateService.set_states(data.data);
      this.states = this._stateService.get_states();
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

 

  DeleteStateFromService(state) {
    this._stateService.DeleteState(state).subscribe((data: any) => {
      this.GetStatesListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertState() {
    let state = new State();
    this._stateService.set_state(state);
    this._router.navigate(['/manage/state/form'])
  }


  UpdateState(state) {
      this._stateService.set_state(state);
      this._router.navigate(['/manage/state/form'])
  }


  Status(changeTo, state: State) {

   
     if (confirm('Are you sure to perform this action?') == true) {
      console.log(changeTo, state);
    
     this.actionStatus = changeTo;
     let ID = state.ID.toString();

      this._stateService.ActionStatus(ID, this.actionStatus).subscribe((success:any) => {
        
        console.log(success)
        this._stateService.set_states(success.data);
       this.states = this._stateService.get_states();
     }) }

     else 
     {
       this.GetStatesListFromService();
       console.log('dont do anything');
     }
  }
}
