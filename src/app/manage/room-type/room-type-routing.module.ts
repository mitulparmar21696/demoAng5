import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomTypeLandingComponent } from './room-type-landing/room-type-landing.component';
import { RoomTypeListingComponent } from './room-type-listing/room-type-listing.component';
import { RoomTypeFormComponent } from './room-type-form/room-type-form.component';
import { RoomTypeService } from './shared/room-type.service';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    component: RoomTypeLandingComponent,
    children: [  
      {
        path: '',
        component: RoomTypeListingComponent
      },       
      {
        path: 'form',
        component: RoomTypeFormComponent
      },
      {
        path: '**',
        component: RoomTypeListingComponent
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
  declarations: [RoomTypeLandingComponent, RoomTypeListingComponent, RoomTypeFormComponent],
  providers: [RoomTypeService]
})

export class RoomTypeRoutingModule { }
