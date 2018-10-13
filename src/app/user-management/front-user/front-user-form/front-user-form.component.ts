import { Component, OnInit, ViewChild } from '@angular/core';
import { FrontUser } from '../shared/front-user.model';
import { ListTrueFalse, ActiveInactive } from '../../../manage/facility-type/shared/active-inactive.model';
import { FrontUserService } from '../shared/front-user.service';
import { Router } from '@angular/router';
import { HeaderVariableService } from '../../../shared/services/headervariable/headervariable.service';
import * as moment from 'moment';
@Component({
  selector: 'app-front-user-form',
  templateUrl: './front-user-form.component.html',
  styleUrls: ['./front-user-form.component.css']
})
export class FrontUserFormComponent implements OnInit {
 //FOR INPUT RESET
 @ViewChild('adminImage')
 adminImage: any;
  frontUser: FrontUser;

  // //FOR IMAGE PREVIEW
  // @ViewChild('mycanvasAdd')
  // mycanvasAdd:any;
  // context : CanvasRenderingContext2D;


  uploaded: any;
  // img:FileReader;


 selectedDropwdownValue: ActiveInactive = new ActiveInactive(1, "Active");
  buttonName: string = "Add";
 isClickedOnce: boolean = false;
  isInvalidFile: boolean = false;
  
  stateId: number;

  DropdownIsActiveList = [
    {'id':1,'name':'Active'},
    {'id':0,'name':'Inactive'}
  //  new ActiveInactive(1, "Active"),
  //  new ActiveInactive(0, "Inactive")
 ];

 formData = new FormData();

  isActiveId: any;
 loading:any;
 constructor(private _ftService: FrontUserService, 
   private _router: Router, 
   private _sharedHeaderService: HeaderVariableService)
   {
   this.isActiveId = 1;
   this.loading=false;
 }

 ngOnInit() {

   window.scrollTo(0, 0);
   this.frontUser = this._ftService.getter();
   if (this.frontUser.ID == undefined) {
     this.buttonName = "Add";
     this.isActiveId = "1";
    
    //  this.isInvalidFile = true

   }
   else {
     
     this.buttonName = "Update";
     this.isActiveId = this.frontUser.IsActive;
     
     
     this.frontUser.DOB1=moment(this.frontUser.DOB).format('YYYY-MM-DD');
     
    this.frontUser.EmailID=this.frontUser.Email
    this.frontUser.Anniversary1=moment(this.frontUser.Anniversary).format('YYYY-MM-DD');
    this.frontUser.MyInterest1 = this.frontUser.MyInterest.split(",");

    
    this.isInvalidFile = false
    
  }
   if (this.frontUser.IsActive != undefined) {
     
    //  {'id':1,'name':'Active'},
    //  {'id':0,'name':'Inactive'}
     if (this.frontUser.IsActive) {
       this.isActiveId = 1;
     }
     else {
       this.isActiveId = 0;
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
   }
   else {
     alert("Only Image files can be uploaded");
     this.resetImage();
     this.isInvalidFile = true;
     return this.isInvalidFile;
   }
 }

 processForm() {
   console.log(this.frontUser);
   this.isClickedOnce = true;
   this.loading=true;
  //  this.validations();
  switch(this.validations()) {
    case false: {
      this.loading=true;
      console.log('do nothing');
      break;
    }

    case true: {
      this.frontUser.IsActive = this.isActiveId;
      console.log(this.frontUser) 
             
      this.frontUser.DOB=moment(this.frontUser.DOB1).format('D/M/YYYY');
      this.frontUser.Anniversary=moment(this.frontUser.Anniversary1).format('D/M/YYYY');
      
      if(this.frontUser.MyInterest1){

        if(this.frontUser.MyInterest1.length>0){
          this.frontUser.MyInterest=this.frontUser.MyInterest1.toString()
        }
      }
       
       if (this.frontUser.ID == undefined) {
         this._ftService.InsertFrontUser(this.frontUser).subscribe((tt: any) => {
           if (tt.status == 200 || tt.status == "200") {
             
             this.UploadImageAfterInsert(tt.data[0].ID);
              alert("admin user added successfully");
              this._ftService.set_frontUsers(tt.data);
            //   this.loading=false;
            //  this._router.navigate(['/user_management/front_user']);
           }
           else {
            this.loading=false;
             alert('Admin user already exists.');
           }
         }, (error) => {
          this.loading=false;
           console.log(error);
         });
       } 
       else {
  
        this.frontUser.IsActive = this.isActiveId;
        
         this._ftService.UpdateFrontUser(this.frontUser).subscribe((tt: any) => {
           
           if (tt.status == 200 || tt.status == "200") {
             this.UploadImageAfterInsert(this.frontUser.ID);
              
             alert( "Admin user updated successfully");
             this._ftService.set_frontUsers(tt.data);
             this.loading=false;
             this._router.navigate(['/user_management/front_user']);
           }
           else {
            this.loading=false;
             alert('Admin user already exists.');
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

 BackToFrontUser() {
   this._router.navigate(['/user_management/front_user']);
 }

 UploadImageAfterInsert(id) {
   
   
   this._ftService.UploadImage(id, this.formData).subscribe((data: any) => {
     
    this.loading=false;
    this._router.navigate(['/user_management/front_user']);
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






keyPressed(event : any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}

validations() {
  
  let value = 0;
  var frontUserFirstName = $("#frontUserFirstName").val().toString(); 
  var frontUserLastName = $("#frontUserLastName").val().toString();   
  var frontUserMobileNo = $("#FrontUserMobileNo").val().toString();

  //IF IN ADD
  
  if(this.buttonName == "Add"){
    var frontUserPassword = $("#frontUserPassword").val().toString();
    if($.trim(frontUserPassword) == "") {
      this.frontUser.Password ="";
      value = value + 1;
      alert('Please enter password');
    }
  }
  

    
    
    

   if($.trim(frontUserFirstName) == "") { 
   this.frontUser.FirstName = "";
    alert('Please enter first name');
    value = value + 1;
   }
    if ($.trim(frontUserLastName) == "") {
     this.frontUser.LastName = "";
     alert('Please enter last name');
     value = value + 1;
   }
   

   if($.trim(frontUserMobileNo) == "") {
     this.frontUser.MobileNo ="";
     value = value + 1;
     alert('Please enter mobile no');
   }


  if(value >= 1) {
    return false
  }
  else {
    return true
  }

}

}