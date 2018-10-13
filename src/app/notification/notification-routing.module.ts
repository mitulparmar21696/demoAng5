import { Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { NotificationLandingComponent } from './notification-landing/notification-landing.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import {TemplateFormComponent} from '../notification/template/template-form/template-form.component';
import {SendnotificationFormComponent} from './sendnotification-form/sendnotification-form.component'
export const routes: Routes = [
  {
    path: '',
    component: NotificationLandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'template',
        pathMatch: 'full'
      },     
      {
        path: 'template',
        component: TemplateComponent,
      },     
      {
        path: 'sendNotification',
        component: SendNotificationComponent,
      },
      {
        path: 'sendNotification-form',
        component: SendnotificationFormComponent,
      },
      {
        path:'template-form',
        component:TemplateFormComponent
      },
      {
        path: '**',
        component: TemplateComponent
      }
    ]
  }
];