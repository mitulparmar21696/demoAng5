// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { AttractionListingComponent } from './attractiondetails/attraction-listing/attraction-listing.component';
// import { AttractionFormComponent } from './attractiondetails/attraction-form/attraction-form.component';
// import { AttractiondetailsLandingComponent } from './attractiondetails/attractiondetails-landing/attractiondetails-landing.component';
// import { AttractionService } from './attractiondetails/shared/attraction.service';
import { BookingLandingComponent } from './booking-landing/booking-landing.component';
import { AleartService } from '../core/service/alert.service';
import {BookingListingComponent} from './booking-listing/booking-listing.component'


export const routes: Routes = [
  {
    path: '',
    component: BookingLandingComponent,
    children: [
      {
        path: 'list',
        component: BookingListingComponent
      },
      // {
      //   path: 'add',
      //   component: InvoiceAddComponent
      // },
      // {
      //   path: 'form',
      //   component: InvoiceFormComponent
      // },
      {
        path: '**',
        component: BookingListingComponent
      },
    ]
  }
];

