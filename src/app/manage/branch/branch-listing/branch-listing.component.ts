import { Component, OnInit } from '@angular/core';
import {BranchService} from '../shared/branch.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-branch-listing',
  templateUrl: './branch-listing.component.html',
  styleUrls: ['./branch-listing.component.css']
})
export class BranchListingComponent implements OnInit {
  private branches:any;
  private loading:any;
  private cols: any[] = [
    { field: 'CityName', header: 'City Name' },
    { field: 'BranchName', header: 'Branch Name' },
    { field: 'MobileNo', header: 'Mobile Number' },
    { field: 'Email', header: 'Email' },
    { field: 'IsActive', header: 'Status' },
  ];
  constructor(private _ttService:BranchService,private _router:Router) {
    this.branches=[];
    this.loading=false;
   }

  ngOnInit() {
    this.loading=true;
    this.getBranchList()
  }
  getBranchList(){
    this._ttService.getBranchList().subscribe((data: any) => {
      
      this.branches=data.data;
      this.loading=false;
    }, (error) => {
      console.log(error);
    });
  }
  addBranch(){
    this._router.navigate(['/manage/branch/form']);

  }
  UpdateBranch(dt){
    this._ttService.setter(dt);
    this._router.navigate(['/manage/branch/form']);
  }
  DeleteBranch(dt){
    if (confirm('Are you sure to delete this record?') == true) {
      this._ttService.deleteBranch(dt.ID).subscribe((data: any) => {
        this.branches=data.data;
        this.loading=false;
      }, (error) => {
        console.log(error);
      });
    }
  
  }

}
