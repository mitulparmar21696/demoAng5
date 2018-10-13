import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationService } from '../shared/destination.service';
import { Destination } from '../shared/destination.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-tourdestination-listing',
  templateUrl: './tourdestination-listing.component.html',
  styleUrls: ['./tourdestination-listing.component.css']
})
export class TourdestinationListingComponent implements OnInit {

  private tds: Destination[] = [];
  private selectedTDs: Destination[];
  private actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  private cols: any[] = [
    { field: 'DestinationName', header: 'Name' },
    { field: 'Description', header: 'Description' },
    { field: 'CategoryName', header: 'Category' },
    { field: 'TourType', header: 'Tour Type' },
    { field: 'IsActive', header: 'Status' }
  ];
  private selectedDestinationString: string = "";
  private nameId: any;
  private actionStatus: boolean;

  loading = false;

  constructor(private _router: Router, private _service: DestinationService , private _cService : CommonService) { }

  ngOnInit() {
    this.loading = true;
    this.GetTourDestinationList();
    this.nameId = '1';
    this._cService.destinationId = 0;
  }

  GetTourDestinationList() {
    this._service.GetDestinationList().subscribe((data: any) => {
      this.tds = data.data;
      this.loading = false;
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
  }

  InsertTourDestination() {
    this._cService.destinationId = 0;
    let td = new Destination();
    this._service.setter(td);
    this.NavigateToForm();
  }

  UpdateTourDestination(destination) {
    this._cService.destinationId = destination.ID;
    this._service.setter(destination);    
    this.NavigateToForm();
  }

  DeleteTourDestination(td) {
    if (confirm('Are you sure to delete this record?') == true) {
      this.loading = true;
      this._service.DeleteDestination(td).subscribe((data: any) => {
        this.GetTourDestinationList();
      }, (error) => {
        console.log(error);
      });
    }
  }

  CustomAction() {
    //console.log(this.nameId);
    if (this.nameId && this.selectedTDs && this.selectedTDs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true) {
        this.loading = true;
        this.selectedTDs.forEach(element => {
          this.selectedDestinationString += element.ID + ",";
        });
        this.selectedDestinationString = this.selectedDestinationString.length > 0 ? this.selectedDestinationString.substring(0, this.selectedDestinationString.length - 1) : ""
        //console.log(this.selectedTourtypeString);


        if (this.nameId == 1 || this.nameId == 2) {
          if (this.nameId == 1)
            this.actionStatus = true;
          else
            this.actionStatus = false;
          // this._service.ActionStatus(this.selectedDestinationString, this.actionStatus).subscribe((data: any) => {
          //   this.GetTourDestinationList();
          // }, (error) => {
          //   console.log(error);
          // });
          this.loading = false;
        }
        else if (this.nameId == 3) {
          // this._service.ActionDelete(this.selectedDestinationString).subscribe((data: any) => {
          //   this.GetTourDestinationList();
          // }, (error) => {
          //   console.log(error);
          // });
          this.loading = false;
        }
        else {
          console.log('select valid action');
          this.loading = false;
        }
        this.selectedDestinationString = "";
        this.nameId = -1;
      }
    }
    else {
      alert('Please select atleast one tour type');
    }
    this.nameId = '1';
  }

  NavigateToForm() {
    this._router.navigate(['/tour/tourdestination/form']);
  }

}
