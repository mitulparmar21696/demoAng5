import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CountryLandingComponent } from './country-landing/country-landing.component';
import { CountryListingComponent } from './country-listing/country-listing.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CountryService } from './shared/country.service';

const routes: Routes = [
  {
    path: '',
    component: CountryLandingComponent,
    children: [  
      {
        path: '',
        component: CountryListingComponent
      },       
      {
        path: 'form',
        component: CountryFormComponent
      },
      {
        path: '**',
        component: CountryListingComponent
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
  declarations: [CountryLandingComponent, CountryListingComponent, CountryFormComponent],
  providers: [CountryService]
})
export class CountryRoutingModule { }
