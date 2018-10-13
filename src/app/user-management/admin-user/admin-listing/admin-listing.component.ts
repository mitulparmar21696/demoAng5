import { Component, OnInit } from '@angular/core';
import { AdminUser } from '../shared/admin-user.model';
import { AdminService } from '../shared/admin.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-listing',
  templateUrl: './admin-listing.component.html',
  styleUrls: ['./admin-listing.component.css']
})
export class AdminListingComponent implements OnInit {

  adminUsers: AdminUser[] = [];
  facility = new AdminUser();
  selectedFTs: AdminUser[];
  actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' },
  ];
  cols: any[] = [
    { field: 'FirstName', header: 'First Name' },
    { field: 'LastName', header: 'Last Name' },
    { field: 'EmailID', header: 'Email' },
    { field: 'RoleID', header: 'Role' },
    { field: 'Image', header: 'Image' }, //might have to change after getting the api of the same
    { field: 'IsActive', header: 'Active?' }
  ];
  selectedAdminUserString: string = "";
  nameId: any;
  actionStatus: string;
  checkedValue: any;
  roleName:string;

  readonly defaultImageUrl = environment.DefaultImageTourtype;
  loading:any;
  constructor(private _ttService: AdminService, 
              private _router: Router ) {  
              this.loading=false;  
  }

  ngOnInit() {
    this.loading=true;
    this.GetAdminUserListFromService();  
    this.nameId = '1';
  }

  CustomAction() {
    if (this.nameId && this.selectedFTs && this.selectedFTs.length > 0) {
      if (confirm('Are you sure to perform this action?') == true)
      {
           this.selectedFTs.forEach(element => {
            this.selectedAdminUserString += element.ID + ",";
          });
          this.selectedAdminUserString = this.selectedAdminUserString.length > 0 ? this.selectedAdminUserString.substring(0, this.selectedAdminUserString.length - 1) : ""
          //console.log(this.selectedTourtypeString);
          
          if (this.nameId == 1 || this.nameId == 2) {
            if (this.nameId == 1)
              this.actionStatus = "Active";
            else
              this.actionStatus = "Inactive";
            this._ttService.ActionStatus(this.selectedAdminUserString, this.actionStatus).subscribe((data: any) => {
              this.GetAdminUserListFromService();
            }, (error) => {
              console.log(error);
            });
          }
          
          else if (this.nameId == 3) {
            this._ttService.ActionDelete(this.selectedAdminUserString).subscribe((data: any) => {
              this.GetAdminUserListFromService();
            }, (error) => {
              console.log(error);
            });
          }

          else {
            console.log('select valid action');
          }

          this.selectedAdminUserString = "";
          this.nameId = -1;

        }  
        else {
         console.log('nothing should happen')
        }
        this.nameId = '1';
      
    }

    else {
      alert('Please select atleast one admin user');
    }
  }

  GetAdminUserList() {
    this.GetAdminUserListFromService();
  }

  DeleteAdminUser(tt) {
    if (confirm('Are you sure to delete this record?') == true)
    {
      this.DeleteAdminUserFromService(tt);
      this.GetAdminUserListFromService();
    }
    else {
        this.GetAdminUserListFromService();
      }
  }

  GetAdminUserListFromService() {
    this._ttService.GetAdminUserList().subscribe((data: any) => {
      data.data.forEach(element => {
        element.IsActive = element.IsActive == 1 ? true : false;
        // this.imageExists(element.Image, function (exists) {
        //   if (!exists) {
        //     element.Image = environment.DefaultImageTourtype;
        //   }
        // });
      });
      this._ttService.set_adminUsers(data.data);
      this.adminUsers = this._ttService.getAdminUsers();
      this.loading=false;
    }, (error) => {
      console.log(error);
    });
  }

  DeleteAdminUserFromService(tt) {
    this._ttService.DeleteAdminUser(tt).subscribe((data: any) => {
      this.GetAdminUserListFromService();
    }, (error) => {
      console.log(error);
    });
  }

  InsertAdminUser() {
    let adminUser = new AdminUser();
    this._ttService.setter(adminUser);
    this._router.navigate(['/user_management/admin_user/form'])
  }

  UpdateAdminUser(tt) {
        this._ttService.setter(tt);
        this._router.navigate(['/user_management/admin_user/form'])
     }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
  }

  Status(changeTo, ft: AdminUser) {
    if (confirm('Are you sure to perform this action?') == true)
    {
      ft.IsActive = changeTo;
      this._ttService.ActionStatusCopy(ft.ID , ft.IsActive).subscribe((success:any) => {
        
        if(success.Status == 200 || success.Status == '200') {
          this._ttService.set_adminUsers(success.data);
          this.adminUsers = this._ttService.getAdminUsers();
        }
        else {
          console.log(success)
        }
       
      });
    }
      
    else 
      {
        this.GetAdminUserListFromService();
      }
  }
}
