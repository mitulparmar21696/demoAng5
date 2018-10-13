import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WayToReachLandingComponent } from './way-to-reach-landing/way-to-reach-landing.component';
import { WayToReachListingComponent } from './way-to-reach-listing/way-to-reach-listing.component';
import { WayToReachFormComponent } from './way-to-reach-form/way-to-reach-form.component';
import { WayToReachService } from './shared/way-to-reach.service';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    component: WayToReachLandingComponent,
    children: [  
      {
        path: '',
        component: WayToReachListingComponent
      },       
      {
        path: 'form',
        component: WayToReachFormComponent
      },
      {
        path: '**',
        component: WayToReachListingComponent
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
  declarations: [WayToReachLandingComponent, WayToReachListingComponent, WayToReachFormComponent],
  providers: [WayToReachService]
})

export class WayToReachRoutingModule { }
