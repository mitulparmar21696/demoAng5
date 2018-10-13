import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DocumentUploadLandingComponent } from './document-upload-landing/document-upload-landing.component';
import { DocumentUploadListingComponent } from './document-upload-listing/document-upload-listing.component';
import { DocumentUploadFormComponent } from './document-upload-form/document-upload-form.component';
import { DocumentUploadService } from './shared/document-upload.service';

const routes: Routes = [
  {
    path: '',
    component: DocumentUploadLandingComponent,
    children: [  
      {
        path: '',
        component: DocumentUploadListingComponent
      },       
      {
        path: 'form',
        component: DocumentUploadFormComponent
      },
      {
        path: '**',
        component: DocumentUploadListingComponent
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
  declarations: [DocumentUploadLandingComponent, DocumentUploadListingComponent, DocumentUploadFormComponent],
  providers: [DocumentUploadService]
})

export class DocumentUploadRoutingModule { }
