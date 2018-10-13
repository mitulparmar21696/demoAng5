import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './invoice.routing';
import { InvoiceLandingComponent } from './invoice-landing/invoice-landing.component';
import { InvoiceListingComponent } from './invoice-listing/invoice-listing.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { TableModule } from 'primeng/table';
import { InvoiceService } from './shared/invoice.service';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RouterModule.forChild(routes)    
  ],
  declarations: [InvoiceLandingComponent, InvoiceListingComponent, InvoiceAddComponent, InvoiceFormComponent],
  providers: [InvoiceService]
})
export class InvoiceModule { }
