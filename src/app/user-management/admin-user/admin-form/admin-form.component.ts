import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
// import { Listener } from 'selenium-webdriver';
import { ListTrueFalse } from '../../../manage/facility-type/shared/active-inactive.model';
import { AdminUser } from '../shared/admin-user.model';
import { Branch } from '../shared/branch.model';
import { Role } from '../shared/role.model';
import { CityService } from '../../../manage/city/shared/city.service';
import { CountryService } from '../../../manage/country/shared/country.service';
import { Country } from '../../../shared/services/country/country.model';
import { State } from '../../../manage/state/shared/state.model';
import { City } from '../../../manage/city/shared/city.model';
import { environment } from '../../../../environments/environment.prod';
import { ValueTransformer } from '@angular/compiler/src/util';
// import { SecurityQuestions } from '../shared/security-questions.model';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
 //FOR INPUT RESET
 @ViewChild('adminImage')
 adminImage: any;
  adminUser: AdminUser;

  // //FOR IMAGE PREVIEW
  // @ViewChild('mycanvasAdd')
  // mycanvasAdd:any;
  // context : CanvasRenderingContext2D;

  hasChangedCountry:boolean = false;
  hasChangedState: boolean = false;
  hasChangedCity: boolean = false;
  hasChangedBranch: boolean = false;
  hasChagedRole: boolean = false;
  hasChangedSecurityQuestion:boolean = true;

  uploaded: any;
  // img:FileReader;


 selectedDropwdownValue: ListTrueFalse = new ListTrueFalse('1', "Active");
  buttonName: string = "Add";
 isClickedOnce: boolean = false;
  isInvalidFile: boolean = false;
  branches: Branch[] = [];
  roles: Role[] = [];
  Countries: Country[] = [];
  States: State[] = [];
  Cities: City[] = [];

  stateId: number;

  DropdownIsActiveList = [
    {'id':'1','name':'Active'},
    {'id':'0','name':'Inactive'}
  //  new ListTrueFalse('1', "Active"),
  //  new ListTrueFalse('0', "Inactive")
 ];

 formData = new FormData();

  isActiveId: any;
  loading:any;
 constructor(private _ftService: AdminService, 
   private _router: Router, 
   private _sharedHeaderService: HeaderVariableService,
  private _cityService: CityService,
  private _counryService: CountryService)
   {
   this.isActiveId = '1';
   this.loading=false;
 }

 ngOnInit() {

   window.scrollTo(0, 0);
   this.adminUser = this._ftService.getter();
   this.getAllBranches();
   this.getAllRoles();
   this.GetAllActiveCountries();
   if (this.adminUser.ID == undefined) {
     this.buttonName = "Add";
     this.isActiveId = "1";
    this.adminUser.BranchID = '0';
    this.adminUser.RoleID = '1'
    this.adminUser.CountryID = '0'
     this.stateId = 0;
    this.adminUser.CityID = '0';
  
     this.isInvalidFile = true
    this.adminUser.SecurityQuestion = "0"
    this.hasChagedRole = false;
    this.hasChangedBranch = false;
    this.hasChangedCity = false;
    this.hasChangedSecurityQuestion = false;
    this.hasChangedCountry = false;
    this.hasChangedState = false;

   }
   else {
     this.buttonName = "Update";
     
    //  {'id':'1','name':'Active'},
    // {'id':'0','name':'Inactive'}
    if(this.adminUser.IsActive == 'true'){
      this.isActiveId = '1';
    }else{
      this.isActiveId = '0';
    }
    //  this.isActiveId = this.adminUser.IsActive;
     let value = +this.adminUser.StateID;
     this.stateId = value;
    this.GetAllActiveStates(this.adminUser.CountryID);
    this.GetAllActiveCities(this.stateId);

    this.isInvalidFile = false
    this.hasChangedCountry = true;
    this.hasChangedState= true;
    this.hasChangedCity = true;
    this.hasChangedBranch = true;
    this.hasChagedRole= true;
    this.hasChangedSecurityQuestion = true
    
  }
   if (this.adminUser.IsActive != undefined) {
     if (this.adminUser.IsActive == '1') {
       this.isActiveId = '1';
     }
     else {
       this.isActiveId = '0';
     }
   }
   this._sharedHeaderService.sharedHeaderString = "Admin User";
 }

 onChange(event:any) {
  //  this.uploaded = event.srcElement.files;
   var files = event.srcElement.files;
   if( files[0].type  == 'image/png' ||  files[0].type == 'image/jpg'  ||  files[0].type == 'image/jpeg') {
     this.isInvalidFile = false;
     
     this.formData.append('Data', files[0], files[0].name);    
    //  if(this.adminUser.Image == undefined) {
    //    let canvas = this.mycanvasAdd.nativeElement;
    //    let context = canvas.getContext('2d');
    //    context.clearRect(0,0,400,198);

    //    var render = new FileReader();
    //    render.onload = function(event:any) {
    //      var img = new Image();
    //      img.onload = function() {
    //        canvas.width = 400;
    //        canvas.height = 198;
    //        context.drawImage(img, 0 , 0);
    //      }
    //      img.src = event.target.result;
    //    }

    //    render.readAsDataURL(event.target.files[0]);
    //  }
   }
   else {
     alert("Only Image files can be uploaded");
     this.resetImage();
     this.isInvalidFile = true;
     return this.isInvalidFile;
   }
 }

 processForm() {
  this.loading=true;
   console.log(this.adminUser);
   this.isClickedOnce = true;
  //  this.validations();
  switch(this.validations()) {
    case false: {
      this.loading=false;
      console.log('do nothing');
      break;
    }

    case true: {

      this.adminUser.IsActive = this.isActiveId;
      this.adminUser.StateID = this.stateId.toString();
      this.adminUser.SecurityQuestion 
  
      console.log(this.adminUser.StateID)
       if (this.adminUser.ID == undefined) {
         this._ftService.InsertAdminUser(this.adminUser).subscribe((tt: any) => {
           if (tt.status == 200 || tt.status == "200") {
             
             this.UploadImageAfterInsert(tt.data[0].ID);
              alert("Admin user added successfully");
              this._ftService.set_adminUsers(tt.data);
              // this.loading=false;
            //  this._router.navigate(['/user_management/admin_user']);
           }
           else {
             
             let value = tt.message.toLowerCase();
             this.loading=false;
             console.log(value);
             alert(value);
           }
         }, (error) => {
          this.loading=false;
           console.log(error);
         });
       } 
       else {
  
        this.adminUser.IsActive = this.isActiveId;
        this.adminUser.StateID = this.stateId.toString();
   
         this._ftService.UpdateAdminUser(this.adminUser).subscribe((tt: any) => {
           
           if (tt.status == 200 || tt.status == "200") {
             
             this.UploadImageAfterInsert(this.adminUser.ID);
             alert( "Admin user updated successfully");
             this._ftService.set_adminUsers(tt.data);
            }
           else {
             
             let value = tt.message.toLowerCase();
             console.log(value);
             this.loading=false;
             alert(value);
           }
         }, (error) => {
          this.loading=false;
           console.log(error);
         });
       }
    }
    break;
  } //Case finished
  
   this.isClickedOnce = false;
 }

 BackToAdminUser() {
   this._router.navigate(['/user_management/admin_user']);
 }

 UploadImageAfterInsert(id) {
   
   this._ftService.UploadImage(id, this.formData).subscribe((data: any) => {
     
     this.loading=false;
             this._router.navigate(['/user_management/admin_user']);

    //  return data;
   }, (error) => {
     console.log(error);
   })
 }

 validateFile(name: String) {
   var ext = name.substring(name.lastIndexOf('.') + 1);
   if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg'
     || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'img') {
     return true;
   }
   else {
     return false;
   }
 }

 resetImage() {
   console.log(this.adminImage.nativeElement.files);
   this.adminImage.nativeElement.value = "";
   console.log(this.adminImage.nativeElement.files);
}

getAllBranches() {
  this._ftService.GetAllBranchs().subscribe((data:any) => {
    this.branches = data.data;
  })
}

getAllRoles() {
  this._ftService.GetAllRoles().subscribe((data:any) => {
    this.roles = data.data;
  })
}

GetAllActiveCountries() {
  this._counryService.GetActiveCountryList().subscribe((data: any) => {
    this.Countries = data.data;
  }), 
  error => {
    console.log(error);
  }

}

GetCountryId(countryID: string) {
  this.stateId = 0;
  this.adminUser.CityID = '0';
  this.hasChangedCity = false
  this.hasChangedState = false
  this.hasChangedCountry = false
  this.isValid();
  let value = +countryID
  this.GetAllActiveStates(value);
}

GetStateId(stateId) {

  // this.hasChangedCity = false;
  this.hasChangedState = false
  this.hasChangedCity = false
  this.adminUser.CityID = '0'
 this.isValid();
  this.GetAllActiveCities(stateId);
}
GetAllActiveStates(countryId) {
  this._cityService.GetStatesByCountryID(countryId).subscribe((data:any) => {
    this.States = data.data;
  }),
  error => {
    console.log(error);
  }
}

GetAllActiveCities(stateID) {

  let value = stateID.toString();
  this._ftService.GetActiveCities(value).subscribe((data:any) => {
    this.Cities = data.data;
    this.isValid();
  }),
  error => {
    console.log(error);
  }
}


ChangeCity() {
  this.hasChangedCountry = true
  this.hasChangedState = true
  this.hasChangedCity = true
  this.isValid();
}

ChangedBranch() {
 this.hasChangedBranch = true
 this.isValid();

}
// ChangedRole() {
//   this.hasChagedRole = true
//   this.isValid();
// }


ChangedSecurityQuestions() {
 this.hasChangedSecurityQuestion = true
 this.isValid();
}


isValid() {
  if(this.buttonName == "Add"){
  if(this.hasChangedBranch == true && this.hasChangedSecurityQuestion && this.hasChangedCity == true) {
    this.isInvalidFile = false
  }
  else {
    this.isInvalidFile = true
  }
}
if(this.buttonName == "Update") {
  if(this.adminUser.RoleID != '0' && this.adminUser.CityID != '0' && this.adminUser.BranchID != '0' ) {
    this.isInvalidFile = false
  }
  else {
    this.isInvalidFile = true
  }
}
 
}

keyPressed(event : any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

validations() {
  let value = 0;
  var adminUserFirstName = $("#FirstName").val().toString(); 
  var adminUserLastName = $("#LastName").val().toString();   
  var adminUserMobileNo = $("#Mobile").val().toString();


  //IF IN ADD
  if(this.buttonName == "Add"){
  var adminUserEmailID = $("#adminUser_Email").val().toString();
  var adminUserPassword = $("#adminUser_password").val().toString();
  var adminUserSecurityAnswer = $("#securityAnswer").val().toString();
  var adminUserAltEmailID = $("#adminUser_AltEmail").val().toString();

    if($.trim(adminUserPassword) == "") {
      this.adminUser.Password ="";
      value = value + 1;
      alert('Please add password');
  }

    if($.trim(adminUserSecurityAnswer) == "") {
      this.adminUser.SecurityAnswer ="";
      value = value + 1;
      alert('Please add security answer');
    }
    
    if($.trim(adminUserEmailID) == "") {
      this.adminUser.EmailID == "";
      value = value = 1;
      alert('Please add email Id');
    }

    
    if(adminUserAltEmailID  == adminUserEmailID) {
      this.adminUser.AlternetEmailID ="";
      alert('Email ID and alternate email cannot be the same');
      value = value + 1;
    }
  }


  //IF IN UPDATE
  else {
    var adminUserAltEmailID = $("#adminUser_AltEmail").val().toString();

    if(adminUserAltEmailID == this.adminUser.EmailID) {
      this.adminUser.AlternetEmailID ="";
      alert('Email ID and alternate email cannot be the same');
      value = value + 1;
    }
  }

   if($.trim(adminUserFirstName) == "") { 
   this.adminUser.FirstName = "";
    alert('Please add first name');
    value = value + 1;
   }
    if ($.trim(adminUserLastName) == "") {
     this.adminUser.LastName = "";
     alert('Please add last name');
     value = value + 1;
   }
   

   if($.trim(adminUserMobileNo) == "") {
     this.adminUser.MobileNo ="";
     value = value + 1;
     alert('Please add mobile no');
   }
  
   
   


  if(value >= 1) {
    return false
  }
  else {
    return true
  }
}

// ChangedStatus() {

// }

}
