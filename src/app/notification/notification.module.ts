import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes } from './notification-routing.module';
import { NotificationLandingComponent } from './notification-landing/notification-landing.component';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { SendNotificationService } from './shared/send-notification.service';
import { TemplateFormComponent } from './template/template-form/template-form.component';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import {TemplateService} from './template/shared/template.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SendnotificationFormComponent } from './sendnotification-form/sendnotification-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    EditorModule,
    CalendarModule,
    DialogModule,
    FormsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '6px',
      primaryColour: '#2A3F54',
      secondaryColour: '#2A3F54',
      tertiaryColour: '#2A3F54',
      fullScreenBackdrop: true
    })
  ],
  declarations: [NotificationLandingComponent, TemplateComponent, SendNotificationComponent, TemplateFormComponent, SendnotificationFormComponent],
  providers: [SendNotificationService,TemplateService]
})
export class NotificationModule { }
