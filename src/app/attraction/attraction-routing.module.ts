// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AttractionListingComponent } from './attractiondetails/attraction-listing/attraction-listing.component';
import { AttractionFormComponent } from './attractiondetails/attraction-form/attraction-form.component';
import { AttractiondetailsLandingComponent } from './attractiondetails/attractiondetails-landing/attractiondetails-landing.component';
import { AttractionService } from './attractiondetails/shared/attraction.service';
import { AttractionLandingComponent } from './attraction-landing/attraction-landing.component';
import { AleartService } from '../core/service/alert.service';



export const routes: Routes = [
  {
    path: '',
    component: AttractionLandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'attractiondetails',
        pathMatch: 'full'
      },
      {
        path: 'attractiondetails',
        component: AttractiondetailsLandingComponent,
        children: [
          {
            path: '',
         
            component: AttractionListingComponent,
          },
          {
            path: 'form',
            component: AttractionFormComponent,
          }
        ]
      },
      
      {
        path: '**',
        component: AttractionListingComponent
      }]
  }
];

