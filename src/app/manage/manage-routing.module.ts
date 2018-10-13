// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { TableModule } from 'primeng/table';
// import { ManageLandingComponent } from './manage-landing/manage-landing.component';
import { CartypeListComponent } from './cartype/cartype-list/cartype-list.component';
import { CartypeFormComponent } from './cartype/cartype-form/cartype-form.component';
import { CartypeLandingComponent } from './cartype/cartype-landing/cartype-landing.component';
import { CartypeService } from './cartype/shared/cartype.service';
// import { ManagelandingComponent } from './managelanding/manage-sanding.component';
import { ManageLandingComponent } from './manage-landing/manage-landing.component';
import { AleartService } from '../core/service/alert.service';
import { FacilitytypeListingComponent } from './facility-type/facilitytype-listing/facilitytype-listing.component';
import { FacilitytypeFormComponent } from './facility-type/facilitytype-form/facilitytype-form.component';
import { FacilityTypeService } from './facility-type/shared/facility-type.service';
import { FacilitytypeLandingComponent } from './facility-type/facilitytype-landing/facilitytype-landing.component';
import { CountryLandingComponent } from './country/country-landing/country-landing.component';
import { CountryListingComponent } from './country/country-listing/country-listing.component';
import { CountryFormComponent } from './country/country-form/country-form.component';

import { AttractionLandingComponent } from './attraction/attraction-landing/attraction-landing.component';
import { AttractionListingComponent } from './attraction/attraction-listing/attraction-listing.component';
import { AttractionFormComponent } from './attraction/attraction-form/attraction-form.component';


import { CurrencyLandingComponent } from './currency/currency-landing/currency-landing.component';
import { CurrencyListingComponent } from './currency/currency-listing/currency-listing.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';


import { FlightClassLandingComponent } from './flight-class/flight-class-landing/flight-class-landing.component';
import { FlightClassListingComponent } from './flight-class/flight-class-listing/flight-class-listing.component';
import { FlightClassFormComponent } from './flight-class/flight-class-form/flight-class-form.component';


import { RoomTypeLandingComponent } from './room-type/room-type-landing/room-type-landing.component';
import { RoomTypeListingComponent } from './room-type/room-type-listing/room-type-listing.component';
import { RoomTypeFormComponent } from './room-type/room-type-form/room-type-form.component';


import { StateLandingComponent } from './state/state-landing/state-landing.component';
import { StateListingComponent } from './state/state-listing/state-listing.component';
import { StateFormComponent } from './state/state-form/state-form.component';


import { WayToReachLandingComponent } from './wayToReach/way-to-reach-landing/way-to-reach-landing.component';
import { WayToReachListingComponent } from './wayToReach/way-to-reach-listing/way-to-reach-listing.component';
import { WayToReachFormComponent } from './wayToReach/way-to-reach-form/way-to-reach-form.component';


import { HotelFormComponent } from './hotel/hotel-form/hotel-form.component';
import { HotelLandingComponent } from './hotel/hotel-landing/hotel-landing.component';
import { HotelListingComponent } from './hotel/hotel-listing/hotel-listing.component';

import { CityFormComponent } from './city/city-form/city-form.component';
import { CityLandingComponent } from './city/city-landing/city-landing.component';
import { CityListingComponent } from './city/city-listing/city-listing.component';

import { BannerLandingComponent } from './banner/banner-landing/banner-landing.component';
import { BannerListingComponent } from './banner/banner-listing/banner-listing.component';
import { BanneFormComponent } from './banner/banne-form/banne-form.component';
import { BranchLandingComponent } from './branch/branch-landing/branch-landing.component';
import { BranchListingComponent } from './branch/branch-listing/branch-listing.component';
import {BranchFormComponent} from './branch/branch-form/branch-form.component';
export const routes: Routes = [
  {
    path: '',
    component: ManageLandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'cartype',
        pathMatch: 'full'
      },
      {
        path: 'cartype',
        component: CartypeLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CartypeListComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: CartypeFormComponent,
          }
        ]
      },
      {
        path: 'country',
        component: CountryLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CountryListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: CountryFormComponent,
          }
        ]
      },
      {
        path: 'facility_type',
        component: FacilitytypeLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: FacilitytypeListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: FacilitytypeFormComponent,
          }
        ]
      },
      {
        path: 'hotel',
        component: HotelLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: HotelListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: HotelFormComponent,
          }
        ]
      },
      {
        path: 'branch',
        component: BranchLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: BranchListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: BranchFormComponent,
          }
        ]
      },
      {
        path: 'city',
        component: CityLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CityListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: CityFormComponent,
          }
        ]
      },
      {
        path: 'banner',
        component: BannerLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: BannerListingComponent,
          },
          {
            path: 'form',
            component: BanneFormComponent,
          }
        ]
      },
      // {
      //   path: 'cartype',
      //   component: CartypeListComponent,

      // },
      // {
      //       path: 'form',
      //       component: CartypeFormComponent
      // },
      // {
      //   path: "facility_type",
      //   component: FacilitytypeListingComponent,

      // },
      // {
      //       path: 'form',
      //       component: FacilitytypeFormComponent
      // },
      {
        path: 'flight_class',
        component: FlightClassLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: FlightClassListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: FlightClassFormComponent,
          }
        ]
      },
      {
        path: 'room_type',
        component: RoomTypeLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: RoomTypeListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: RoomTypeFormComponent,
          }
        ]
      },
      {
        path: 'currency',
        component: CurrencyLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CurrencyListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: CurrencyFormComponent,
          }
        ]
      },
      {
        path: 'way_to_reach',
        component: WayToReachLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: WayToReachListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: WayToReachFormComponent,
          }
        ]
      },
      {
        path: 'attraction',
        component: AttractionLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: AttractionListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: AttractionFormComponent,
          }
        ]
      },
      {
        path: 'state',
        component: StateLandingComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: StateListingComponent,
          },
          {
            path: 'form',
            pathMatch: 'full',
            component: StateFormComponent,
          }
        ]
      },
      {
        path: '**',
        component: CartypeListComponent
      }]
  }
];
// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     RouterModule.forChild(routes),
//     TableModule
//   ],
//   declarations: [ManageLandingComponent, CartypeListComponent, CartypeFormComponent, FacilitytypeListingComponent, FacilitytypeFormComponent],
//   providers: [CartypeService, AleartService, FacilityTypeService]
// })
// export class ManageRoutingModule { }
