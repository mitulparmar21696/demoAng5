import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DocumentCategoryLandingComponent } from './document-category-landing/document-category-landing.component';
import { DocumentCategoryListingComponent } from './document-category-listing/document-category-listing.component';
import { DocumentCategoryFormComponent } from './document-category-form/document-category-form.component';
import { DocumentCategoryService } from './shared/document-category.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
const routes: Routes = [
  {
    path: '',
    component: DocumentCategoryLandingComponent,
    children: [  
      {
        path: '',
        component: DocumentCategoryListingComponent
      },       
      {
        path: 'form',
        component: DocumentCategoryFormComponent
      },
      {
        path: '**',
        component: DocumentCategoryListingComponent
      }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes) ,
    TableModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '6px',
      primaryColour: '#2A3F54',
      secondaryColour: '#2A3F54',
      tertiaryColour: '#2A3F54',
      fullScreenBackdrop: true
    })
  ],
  declarations: [DocumentCategoryLandingComponent, DocumentCategoryListingComponent, DocumentCategoryFormComponent],
  providers: [DocumentCategoryService]
})

export class DocumentCategoryRoutingModule { }
