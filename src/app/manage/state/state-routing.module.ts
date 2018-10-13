import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { StateLandingComponent } from './state-landing/state-landing.component';
import { StateListingComponent } from './state-listing/state-listing.component';
import { StateFormComponent } from './state-form/state-form.component';
import { StateService } from './shared/state.service';
import { CountryService } from '../country/shared/country.service';

const routes: Routes = [
  {
    path: '',
    component: StateLandingComponent,
    children: [  
      {
        path: '',
        component: StateListingComponent
      },       
      {
        path: 'form',
        component: StateFormComponent
      },
      {
        path: '**',
        component: StateListingComponent
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
  declarations: [StateLandingComponent, StateListingComponent, StateFormComponent],
  providers: [StateService, CountryService]
})
export class StateRoutingModule { }
