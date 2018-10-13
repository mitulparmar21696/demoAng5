import { Routes } from '@angular/router';
import { InvoiceLandingComponent } from './invoice-landing/invoice-landing.component';
import { InvoiceListingComponent } from './invoice-listing/invoice-listing.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';

export const routes: Routes = [
  {
    path: '',
    component: InvoiceLandingComponent,
    children: [
      {
        path: 'list',
        component: InvoiceListingComponent
      },
      {
        path: 'add',
        component: InvoiceAddComponent
      },
      {
        path: 'form',
        component: InvoiceFormComponent
      },
      {
        path: '**',
        component: InvoiceListingComponent
      },
    ]
  }
];