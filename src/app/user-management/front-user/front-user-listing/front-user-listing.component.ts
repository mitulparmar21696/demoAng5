import { Component, OnInit } from '@angular/core';
import { FrontUser } from '../shared/front-user.model';
import { environment } from '../../../../environments/environment';
import { FrontUserService } from '../shared/front-user.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-front-user-listing',
  templateUrl: './front-user-listing.component.html',
  styleUrls: ['./front-user-listing.component.css']
})
export class FrontUserListingComponent implements OnInit {

  frontUsers: FrontUser[] = [];
  frontUser= new FrontUser();
  selectedFTs: FrontUser[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'Name', header: 'Name' },
    { field: 'City Name', header: 'City Name' },
    { field: 'Mobile No', header: 'Mobile No' },
    { feild: 'Email', header: 'Email' },
    { feild: 'Profile Pic', header: 'Profile Pic'},
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedFrontUserString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;


  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _ttService: FrontUserService, 
              private _router: Router ) {    
                this.loading=false;
  }

  ngOnInit() {
    this.loading=true;
    this.GetFrontUserListFromService();  
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedFTs && this.selectedFTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedFTs.forEach(element => {
            this.selectedFrontUserString += element.ID + ",";
          });
          this.selectedFrontUserString = this.selectedFrontUserString.length > 0 ? this.selectedFrontUserString.substring(0, this.selectedFrontUserString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._ttService.ActionStatus(this.selectedFrontUserString, this.actionStatus).subscribe((data: any) => {
              
              this.GetFrontUserListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            
            this._ttService.ActionDelete(this.selectedFrontUserString).subscribe((data: any) => {
              
              this.GetFrontUserListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedFrontUserString = "";
          this.nameId = -1;

        }  
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one user');
    }
  }

  GetFrontUserList() {
    this.GetFrontUserListFromService();
  }

  DeleteFrontUser(tt) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.DeleteFrontUserFromService(tt);
      this.GetFrontUserListFromService();
    }
    else {
        this.GetFrontUserListFromService();
      }
  }

  GetFrontUserListFromService() {
    this._ttService.GetFrontUserList().subscribe((data: any) => {
      console.log(data);
      data.data.forEach(element => {
        
        element.IsActive = element.IsActive == "True" ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourtype;
        //   }
        // });
      });
      this._ttService.set_frontUsers(data.data);
      this.frontUsers = this._ttService.getfrontUsers();
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }

  DeleteFrontUserFromService(tt) {
    this._ttService.DeleteFrontUser(tt).subscribe((data: any) => {
      this.GetFrontUserListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertFrontUser() {
    let frontUser = new FrontUser();
    this._ttService.setter(frontUser);
    this._router.navigate(['/user_management/front_user/form'])
  }

  UpdateFrontUser(tt) {
        this._ttService.setter(tt);
        this._router.navigate(['/user_management/front_user/form'])
 
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: FrontUser) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      ft.IsActive = changeTo;
      
      this._ttService.UpdateFrontUser(ft).subscribe((success:any) => {
        
        //ADDED TO UPLOAD IMAGE
        success.data.forEach(element => {
          element.IsActive = element.IsActive == 1 ? true : false;
        });
      this._ttService.set_frontUsers(success.data);
      this.frontUsers = this._ttService.getfrontUsers();
      this.GetFrontUserListFromService();
      
    });
    }
      
    else 
      {
        this.GetFrontUserListFromService();
      }
  }

}
