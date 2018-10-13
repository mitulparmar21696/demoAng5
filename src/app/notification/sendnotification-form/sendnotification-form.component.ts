import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendNotificationService } from '../shared/send-notification.service';
@Component({
  selector: 'app-sendnotification-form',
  templateUrl: './sendnotification-form.component.html',
  styleUrls: ['./sendnotification-form.component.css']
})
export class SendnotificationFormComponent implements OnInit {
  private notifications:any;
  loading:any;
  users:any;
  isView:any;
  constructor(private _router:Router,private sendService:SendNotificationService) { 
    this.notifications={}
    this.loading=false;
    this.isView=false;
    this.users=[];
  }

  ngOnInit() {
    this.loading=true;
    this.notifications=this.sendService.getter();
    this.sendService.GetUserList().subscribe((tt: any) => {
      if (tt.status === 200 || tt.status === '200') {
        tt.data.forEach(element => {
          if(element.IsActive=='True'){
            this.users.push(element)
          }
        });
        if(this.notifications.ID){
          this.notifications.UserID=this.notifications.UserID.split(',');
          this.isView=true;
        }
        this.loading=false;
      } else {
        alert('notifications is already exist.');
      }
    }, (error) => {
      console.log(error);
    })
  }
  processForm(){
    this.loading=true;
    this.notifications.OperationType='insert';
   
    if(this.notifications.Subject){
      if(this.notifications.Subject.length==0){
        alert('Please enter Subject')
        return;
      }
    }else{
      alert('Please enter Subject')
      return;
    }
    
    // if(this.notifications.UserType=='Agent'){
    //   this.notifications.NotificationUserType=1;
    // }else{
    //   this.notifications.NotificationUserType=0;

    // }
    if(this.notifications.UserID){
      if(this.notifications.UserID.length==0){
        alert('Select at least one User')
        return;
      }else{
        this.notifications.UserID=this.notifications.UserID.toString();
      }
    }else{
      alert('Please Select User')
      return;
    }
    if(this.notifications.IsEmail==true||this.notifications.IsEmail==1){
      this.notifications.IsEmail=1;
      if(this.notifications.EmailText.length==0){
        this.notifications.IsEmail=0;
      }
    }else{
      this.notifications.IsEmail=0;
    }

    if(this.notifications.IsPushNotification==1 ||this.notifications.IsPushNotification==true){
      this.notifications.IsPushNotification=1; 
      if(this.notifications.PushNotificationText.length<0){
        this.notifications.IsPush=0;
      }
    }else{
      this.notifications.IsPushNotification=0;
    }

    if(this.notifications.IsSMS==1||this.notifications.IsSMS==true){
      this.notifications.IsSMS=1;
      if(this.notifications.SMSText.length==0){
        this.notifications.IsSMS=0;
      }
    }else{
      this.notifications.IsSMS=0;
    }
    
    
    this.sendService.saveNotifications(this.notifications).subscribe((tt: any) => {
      
      if (tt.status === 200 || tt.status === '200') {
        
        alert(tt.message);
        this.loading=false;
        this._router.navigate(['/notification/sendNotification']);
      } else {
        this.loading=false;
        alert('notifications is already exist.');
      }
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }
  backRedirection(){
    this._router.navigate(['/notification/sendNotification']);
  }

}
