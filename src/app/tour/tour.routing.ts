import { Routes } from '@angular/router';
import { TourlandingComponent } from './tourlanding/tourlanding.component';
import { TourtypeListComponent } from './tourtype/tourtype-list/tourtype-list.component';
import { TourtypeFormComponent } from './tourtype/tourtype-form/tourtype-form.component';
import { TourcategoryListingComponent } from './tourcategory/tourcategory-listing/tourcategory-listing.component';
import { TourcategoryFormComponent } from './tourcategory/tourcategory-form/tourcategory-form.component';
import { TourtypeLandingComponent } from './tourtype/tourtype-landing/tourtype-landing.component';
import { TourcategoryLandingComponent } from './tourcategory/tourcategory-landing/tourcategory-landing.component';
import { TourdestinationListingComponent } from './tourdestination/tourdestination-listing/tourdestination-listing.component';
import { TourdestinationFormComponent } from './tourdestination/tourdestination-form/tourdestination-form.component';
import { DestinationComponent } from './tourdestination/destination/destination.component';
import { InclusionComponent } from './tourdestination/inclusion/inclusion.component';
import { FaqComponent } from './tourdestination/faq/faq.component';
import { DocumentComponent } from './tourdestination/document/document.component';
import { TourdestinationLandingComponent } from './tourdestination/tourdestination-landing/tourdestination-landing.component';
import { DestinationimageComponent } from './tourdestination/destinationimage/destinationimage.component';



export const routes: Routes = [
  {
    path: '',
    component: TourlandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'tourtype',
        pathMatch: 'full'
      },
      {
        path: 'tourtype',
        component: TourtypeLandingComponent,
        children: [
          {
            path: '',
            component: TourtypeListComponent,
          },
          {
            path: 'form',
            component: TourtypeFormComponent,
          }
        ]
      },
      {
        path: 'tourcategory',
        component: TourcategoryLandingComponent,
        children: [
          {
            path: '',
            component: TourcategoryListingComponent,
          },
          {
            path: 'form',
            component: TourcategoryFormComponent,
          }
        ]
      },
      {
        path: 'tourdestination',
        component: TourdestinationLandingComponent,
        children: [
          {
            path: '',
            component: TourdestinationListingComponent,
          },
          {
            path: 'form',
            component: TourdestinationFormComponent,    
            children: [
              {
                path: '',
                redirectTo: 'destination',
                pathMatch: 'full'
              },
              {
                path: 'destination',
                component: DestinationComponent,
              },
              {
                path: 'images',
                component: DestinationimageComponent,
              },
              {
                path: 'ieclusion',
                component: InclusionComponent,
              },
              {
                path: 'faq',
                component: FaqComponent,
              },
              {
                path: 'document',
                component: DocumentComponent,
              },
            ]       
          }
        ]
      },
      {
        path: '**',
        component: TourtypeListComponent
      }]
  }
];
