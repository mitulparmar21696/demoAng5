import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionLandingComponent } from './attraction-landing/attraction-landing.component';
import { AttractionListingComponent } from './attraction-listing/attraction-listing.component';
import { AttractionFormComponent } from './attraction-form/attraction-form.component';
import { AttractionService } from './shared/attraction.service';
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

const routes: Routes = [
  {
    path: '',
    component: AttractionLandingComponent,
    children: [  
      {
        path: '',
        component: AttractionListingComponent
      },       
      {
        path: 'form',
        component: AttractionFormComponent
      },
      {
        path: '**',
        component: AttractionListingComponent
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
  declarations: [AttractionLandingComponent, AttractionListingComponent, AttractionFormComponent],
  providers:[AttractionService]
})
export class AttractionRoutingModule { }
