import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { SendNotification } from '../shared/send-notification.model';
import { SendNotificationService } from '../shared/send-notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {

  private notifications: SendNotification[] = [];
  private selectedNotification: SendNotification[] = [];
  private loading : any;
  private actions: SelectItem[] = [
    { label: 'Active', value: '1' },
    { label: 'Inactive', value: '2' },
    { label: 'Delete', value: '3' }
  ];
  private cols: any[] = [
    { field: 'IsEmail', header: 'Is Email' },
    { field: 'Subject', header: 'Subject' },
    { field: 'IsSMS', header: 'Is SMS' },
    // { field: 'SMSText', header: 'SMS' },
    { field: 'IsPushNotification', header: 'Is Push' },
    // { field: 'PushNotificationText', header: 'Push Note' },
    // { field: 'LastChanged', header: 'Last Changed' },
    { field: 'IsActive', header: 'Status' }
  ];

  constructor(private _snService:SendNotificationService,private _router:Router) {
    this.loading=false;
   }

  ngOnInit() {
    this.loading=true;
    this.GetNotificationsList();
  }

  GetNotificationsList(){
    this._snService.GetSendNotificationList().subscribe((data: any) => {
      this.notifications = data.data;
      this.loading=false;
    }, (error) => {
      this.loading=false;
      console.log(error);
    });
  }
  UpdateNotification(data){
    this._snService.setter(data);
    this._router.navigate(['/notification/sendNotification-form']);
  }
  addNotification(){
    this._snService.setter({});
    this._router.navigate(['/notification/sendNotification-form']);
  }
  DeleteNotification(id){
      if (confirm('Are you sure to perform this action?') == true)
      {
        this._snService.deleteNotification(id.ID).subscribe((data: any) => {
          this.notifications = data.data;
          this.loading=false;
        }, (error) => {
          this.loading=false;
          console.log(error);
        });
      }
  }

}
