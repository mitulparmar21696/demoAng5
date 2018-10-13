import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyLandingComponent } from './currency-landing/currency-landing.component';
import { CurrencyListingComponent } from './currency-listing/currency-listing.component';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CurrencyService } from './shared/currency.service';
import { CountryService } from '../country/shared/country.service';


const routes: Routes = [
  {
    path: '',
    component: CurrencyLandingComponent,
    children: [  
      {
        path: '',
        component: CurrencyListingComponent
      },       
      {
        path: 'form',
        component: CurrencyFormComponent
      },
      {
        path: '**',
        component: CurrencyListingComponent
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
  declarations: [CurrencyLandingComponent, CurrencyListingComponent, CurrencyFormComponent],
  providers: [CurrencyService, CountryService]
})
export class CurrencyRoutingModule { }
