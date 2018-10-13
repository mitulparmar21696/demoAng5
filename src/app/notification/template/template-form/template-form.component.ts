import { Component, OnInit } from '@angular/core';
import {TemplateService} from '../shared/template.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  private template:any;
  private loading:any;
  constructor(private _ttService:TemplateService ,private _router:Router) {
    this.template={};
    this.loading=false;
   }
  
  ngOnInit() {
    
    this.template = this._ttService.getter();
    if(!this.template){
      this.template={};
      this._router.navigate(['/notification/template']);
    }
    
  }
  processForm(){
    
    this.loading=true;
    this.template.OperationType='update';
    
    // if(this.template.UserType=='Agent'){
    //   this.template.NotificationUserType=1;
    // }else{
    //   this.template.NotificationUserType=0;

    // }
    if(this.template.IsEmail==true||this.template.IsEmail==1){
      this.template.IsEmail=1;
      if(this.template.EmailText.length==0){
        this.template.IsEmail=0;
      }
    }else{
      this.template.IsEmail=0;
    }

    if(this.template.IsPushNotification==1 ||this.template.IsPushNotification==true){
      this.template.IsPushNotification=1; 
      if(this.template.PushNotificationText.length<0){
        this.template.IsPush=0;
      }
    }else{
      this.template.IsPushNotification=0;
    }

    if(this.template.IsSMS==1||this.template.IsSMS==true){
      this.template.IsSMS=1;
      if(this.template.SMSText.length==0){
        this.template.IsSMS=0;
      }
    }else{
      this.template.IsSMS=0;
    }
    
    
    this._ttService.saveTemplate(this.template).subscribe((tt: any) => {
      
      if (tt.status === 200 || tt.status === '200') {
        
        alert(tt.message);
        this.loading=false;
        this._router.navigate(['/notification/template']);
      } else {
        alert('Template is already exist.');
      }
    }, (error) => {
      console.log(error);
    });
  }
  backRedirection(){
    this._router.navigate(['/notification/template']);
  }

}
