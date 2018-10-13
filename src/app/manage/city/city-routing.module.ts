import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityLandingComponent } from './city-landing/city-landing.component';
import { CityListingComponent } from './city-listing/city-listing.component';
import { CityFormComponent } from './city-form/city-form.component';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from '../../shared/layout/header/header.module';
import { HeaderProfileModule } from '../../shared/layout/headerprofile/headerprofile.module';
import { FooterModule } from '../../shared/layout/footer/footer.module';
import { ServicesModule } from '../../shared/services/services.module';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { TableModule } from 'primeng/table';
import { CityService } from './shared/city.service';
import { CountryService } from '../country/shared/country.service';


const routes: Routes = [
  {
    path: '',
    component: CityLandingComponent,
    children: [  
      {
        path: '',
        component: CityListingComponent
      },       
      {
        path: 'form',
        component: CityFormComponent
      },
      {
        path: '**',
        component: CityListingComponent
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
  declarations: [CityLandingComponent, CityListingComponent, CityFormComponent],
  providers:[CityService, CountryService]
})
export class CityRoutingModule { }
