import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../packages/packagelist/shared/package.service';
import { DestinationService } from '../tour/tourdestination/shared/destination.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  packages:any;
  tourDestination:any;
  loading:any;
  constructor(private _router: Router, private _service: PackageService,private _service1:DestinationService) { 
    this.packages=[];
    this.tourDestination=[];
    this.loading=false;
  }

  ngOnInit() {
    this.loading=true;
    var firstLoad=localStorage.getItem("firstLoad");
    if(firstLoad != 'true'){
      localStorage.setItem("firstLoad", 'true');
      location.reload();
    }
    if(firstLoad == 'true'){
      this.GetPackageList(0);
    }
  }

  GetPackageList(destinationId: number) {
    this._service.GetPackageList(destinationId).subscribe((data: any) => {
      
      for(var i=1;i<6;i++){
        var pack=data.data[i-1]
        pack.No=i;
        this.packages.push(pack);
      }
      
      this.GetTourDestinationList();
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  GetTourDestinationList() {
    this._service1.GetDestinationList().subscribe((data: any) => {
      
      for(var i=1;i<6;i++){
        var pack=data.data[i-1]
        pack.No=i;
        this.tourDestination.push(pack);
      }
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }
  viewPackage(){
    this._router.navigate(['/packages/list']);
  }
  viewDestinations(){
    this._router.navigate(['/tour/tourdestination']);
  }

}
