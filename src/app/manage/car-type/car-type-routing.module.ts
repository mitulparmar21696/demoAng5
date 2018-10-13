import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CartypeLandingComponent } from './cartype-landing/cartype-landing.component';
import { CartypeListComponent } from './cartype-list/cartype-list.component';
import { CartypeFormComponent } from './cartype-form/cartype-form.component';
import { CartypeService } from './shared/cartype.service';
import { AleartService } from '../facility-type/shared/aleart.service';

const routes: Routes = [
  {
    path: '',
    component: CartypeLandingComponent,
    children: [  
      {
        path: '',
        component: CartypeListComponent
      },       
      {
        path: 'form',
        component: CartypeFormComponent
      },
      {
        path: '**',
        component: CartypeListComponent
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
  declarations: [CartypeLandingComponent, CartypeListComponent, CartypeFormComponent],
  providers: [CartypeService, AleartService]
})
export class CarTypeRoutingModule { }
