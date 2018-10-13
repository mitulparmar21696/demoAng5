import { Component, OnInit } from '@angular/core';
import {BranchService} from '../shared/branch.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.css']
})
export class BranchFormComponent implements OnInit {
  private cities:any;
  private countries:any;
  private branch:any;
  private states:any;
  private cityId:any;
  private loading:any;
  constructor(private _service:BranchService,private _router:Router) { 
    this.cities=[]
    this.countries=[];
    this.branch={
      "IsActive":"1",
      "CityID":""
    };
    this.states=[];
    this.cityId=[];
    this.loading=false;
  }

  ngOnInit() {
    this.loading=true;
  
  this.branch=this._service.getter();
  if(!this.branch.ID){
    this.branch={
      "IsActive":"1",
      "CityID":""
    };
  }
  this.getCities();
  }
  // getCountryList(){
  //   this._service.getCountryList().subscribe((data: any) => {
  //     this.countries=data.data;
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }
  // getStates(id){
  //   this._service.getStateList(id).subscribe((data: any) => {
  //     this.states=data.data;
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }
  getCities(){
    this._service.getCityList().subscribe((data: any) => {
      this.cities=data.data;
      if(this.branch.ID){
        this.cityId = data.data.filter(br =>br.Name === this.branch.CityName);
        if(this.cityId.length>0){
          this.branch.CityID=this.cityId[0].ID;
        }else{
          this.branch.CityID='';
        }
      }
    
      this.loading=false;
    }, (error) => {
      console.log(error);
    });
  }
  processForm(form){
    this.loading=true;
    if(form.form.status == "VALID"){
      this.branch;
      if(this.branch.ID == undefined){
        this.branch.OperationType='insert';
        this._service.saveBranch(this.branch).subscribe((data: any) => {
          alert('Branch Added successfuly')
          this.loading=false;
          this._router.navigate(['/manage/branch'])
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }else{
        this.branch.OperationType='update';
        this._service.saveBranch(this.branch).subscribe((data: any) => {
          alert('Updated successfuly')
          this.loading=false;
          this._router.navigate(['/manage/branch'])
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
    }else{
      alert('Please add required fieleds')
      this.loading=false;
      return
    }
  }
  redirectBack(){
    this._router.navigate(['/manage/branch'])
  }
}
