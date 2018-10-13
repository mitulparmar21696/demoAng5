import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightClassLandingComponent } from './flight-class-landing/flight-class-landing.component';
import { FlightClassListingComponent } from './flight-class-listing/flight-class-listing.component';
import { FlightClassFormComponent } from './flight-class-form/flight-class-form.component';
import { FlightClassService } from './shared/flight-class.service';
import { TableModule } from 'primeng/table';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: FlightClassLandingComponent,
    children: [  
      {
        path: '',
        component: FlightClassListingComponent
      },       
      {
        path: 'form',
        component: FlightClassFormComponent
      },
      {
        path: '**',
        component: FlightClassListingComponent
      }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes) ,
    TableModule
  ],
  declarations: [FlightClassLandingComponent, FlightClassListingComponent, FlightClassFormComponent],
  providers: [FlightClassService]
})

export class FlightClassRoutingModule { }
