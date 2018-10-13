import { Routes } from '@angular/router';
import { PackagelandingComponent } from './packagelanding/packagelanding.component';
import { PackageListingComponent } from './packagelist/package-listing/package-listing.component';
import { PackageListLandingComponent } from './packagelist/package-landing/package-landing.component';
import { PackageFormComponent } from './packagelist/package-form/package-form.component';
import { PackageDetailComponent } from './packagelist/package-detail/package-detail.component';
import { PackagerateComponent } from './packagelist/packagerate/packagerate.component';
import { PackageItineraryComponent } from './packagelist/package-itinerary/package-itinerary.component';
import { PackageHotelComponent } from './packagelist/package-hotel/package-hotel.component';
import { PackageInclusionComponent } from './packagelist/package-inclusion/package-inclusion.component';
import { PackageFaqComponent } from './packagelist/package-faq/package-faq.component';
import { PackageInfoComponent } from './packagelist/package-info/package-info.component';
import { PackageSupportComponent } from './packagelist/package-support/package-support.component';
import { PackageImagesComponent } from './packagelist/package-images/package-images.component';


export const routes: Routes = [
  {
    path: '',
    component: PackagelandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },     
      {
        path: 'list',
        component: PackageListLandingComponent,
        children: [
          {
            path: '',
            component: PackageListingComponent,
          },
          {
            path: 'form',
            component: PackageFormComponent,    
            children: [
              {
                path: '',
                redirectTo: 'package',
                pathMatch: 'full'
              },
              {
                path: 'package', //1
                component: PackageDetailComponent,
              },
              {
                path: 'packagerate', //2
                component: PackagerateComponent,
              },
              {
                path: 'itinerary', //3
                component: PackageItineraryComponent,
              },
              {
                path: 'itineraryphotos', //4
                component: PackageImagesComponent,
              },
              {
                path: 'packagehotel', //5
                component: PackageHotelComponent,
              },
              {
                path: 'packageinclusion', //6
                component: PackageInclusionComponent,
              },
              {
                path: 'packagefaq', //7
                component: PackageFaqComponent,
              },
              {
                path: 'packagetourinfo', //8
                component: PackageInfoComponent,
              },
              {
                path: 'packagesupport', //9
                component: PackageSupportComponent,
              },
            ]       
          }
        ]
      },
      {
        path: '**',
        component: PackageListingComponent
      }]
  }
];
