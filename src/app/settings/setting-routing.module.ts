// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { TableModule } from 'primeng/table';
// import { ManageLandingComponent } from './manage-landing/manage-landing.component';
import { SettingListingComponent } from './settings/setting-listing/setting-listing.component';
import { SettingFormComponent } from './settings/setting-form/setting-form.component';
import { SettingLandingComponent } from './settings/setting-landing/setting-landing.component';
import { SettingService } from './settings/shared/setting.service';
// import { ManagelandingComponent } from './managelanding/manage-sanding.component';
import { SettingLangingComponent } from './setting-langing/setting-langing.component';
import { AleartService } from '../core/service/alert.service';



export const routes: Routes = [
  {
    path: '',
    component: SettingLangingComponent,
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        component: SettingLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: SettingListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: SettingFormComponent,
          }
        ]
      },
      
      {
        path: '**',
        component: SettingListingComponent
      }]
  }
];

