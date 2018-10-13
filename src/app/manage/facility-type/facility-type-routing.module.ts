import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilityLandingComponent } from './facility-landing/facility-landing.component';
import { FacilitytypeListingComponent } from './facilitytype-listing/facilitytype-listing.component';
import { FacilitytypeFormComponent } from './facilitytype-form/facilitytype-form.component';
import { FacilityTypeService } from './shared/facility-type.service';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    component: FacilityLandingComponent,
    children: [  
      {
        path: '',
        component: FacilitytypeListingComponent
      },       
      {
        path: 'form',
        component: FacilitytypeFormComponent
      },
      {
        path: '**',
        component: FacilitytypeListingComponent
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
  declarations: [FacilityLandingComponent, FacilitytypeListingComponent, FacilitytypeFormComponent],
  providers: [FacilityTypeService]
})
export class FacilityTypeRoutingModule { }
