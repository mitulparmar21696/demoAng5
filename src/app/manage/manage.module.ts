import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './manage-routing.module';

import { HeaderVariableService } from '../shared/services/headervariable/headervariable.service';
import { CartypeService } from './cartype/shared/cartype.service';
import { FacilityTypeService } from './facility-type/shared/facility-type.service';
import { ManageLandingComponent } from './manage-landing/manage-landing.component';
import { CartypeListComponent } from './cartype/cartype-list/cartype-list.component';
import { CartypeFormComponent } from './cartype/cartype-form/cartype-form.component';
import { FacilitytypeListingComponent } from './facility-type/facilitytype-listing/facilitytype-listing.component';
import { FacilitytypeFormComponent } from './facility-type/facilitytype-form/facilitytype-form.component';
import { TableModule } from 'primeng/table';
import { CartypeLandingComponent } from './cartype/cartype-landing/cartype-landing.component';
import { FacilitytypeLandingComponent } from './facility-type/facilitytype-landing/facilitytype-landing.component';
import { CountryLandingComponent } from './country/country-landing/country-landing.component';
import { CountryListingComponent } from './country/country-listing/country-listing.component';
import { CountryFormComponent } from './country/country-form/country-form.component';
import { CountryService } from './country/shared/country.service';

import { AttractionLandingComponent } from './attraction/attraction-landing/attraction-landing.component';
import { AttractionListingComponent } from './attraction/attraction-listing/attraction-listing.component';
import { AttractionFormComponent } from './attraction/attraction-form/attraction-form.component';
import { AttractionService } from './attraction/shared/attraction.service';

import { CurrencyLandingComponent } from './currency/currency-landing/currency-landing.component';
import { CurrencyListingComponent } from './currency/currency-listing/currency-listing.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';
import { CurrencyService } from './currency/shared/currency.service';

import { FlightClassLandingComponent } from './flight-class/flight-class-landing/flight-class-landing.component';
import { FlightClassListingComponent } from './flight-class/flight-class-listing/flight-class-listing.component';
import { FlightClassFormComponent } from './flight-class/flight-class-form/flight-class-form.component';
import { FlightClassService } from './flight-class/shared/flight-class.service';

import { RoomTypeLandingComponent } from './room-type/room-type-landing/room-type-landing.component';
import { RoomTypeListingComponent } from './room-type/room-type-listing/room-type-listing.component';
import { RoomTypeFormComponent } from './room-type/room-type-form/room-type-form.component';
import { RoomTypeService } from './room-type/shared/room-type.service';

import { StateLandingComponent } from './state/state-landing/state-landing.component';
import { StateListingComponent } from './state/state-listing/state-listing.component';
import { StateFormComponent } from './state/state-form/state-form.component';
import { StateService } from './state/shared/state.service';

import { WayToReachLandingComponent } from './wayToReach/way-to-reach-landing/way-to-reach-landing.component';
import { WayToReachListingComponent } from './wayToReach/way-to-reach-listing/way-to-reach-listing.component';
import { WayToReachFormComponent } from './wayToReach/way-to-reach-form/way-to-reach-form.component';
import { WayToReachService } from './wayToReach//shared/way-to-reach.service';

import { AleartService } from '../core/service/alert.service';
import { HotelFormComponent } from './hotel/hotel-form/hotel-form.component';
import { HotelLandingComponent } from './hotel/hotel-landing/hotel-landing.component';
import { HotelListingComponent } from './hotel/hotel-listing/hotel-listing.component';
import { HotelService } from './hotel/shared/hotel.service';

import { CityFormComponent } from './city/city-form/city-form.component';
import { CityLandingComponent } from './city/city-landing/city-landing.component';
import { CityListingComponent } from './city/city-listing/city-listing.component';
import { CityService } from './city/shared/city.service';
import { BannerLandingComponent } from './banner/banner-landing/banner-landing.component';
import { BannerListingComponent } from './banner/banner-listing/banner-listing.component';
import { BanneFormComponent } from './banner/banne-form/banne-form.component';
import { BannerService } from './banner/shared/banner.service';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { BranchLandingComponent } from './branch/branch-landing/branch-landing.component';
import { BranchListingComponent } from './branch/branch-listing/branch-listing.component';
import {BranchService} from './branch/shared/branch.service';
import { BranchFormComponent } from './branch/branch-form/branch-form.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
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
  declarations: [ManageLandingComponent, CartypeListComponent, CartypeListComponent
    , CartypeFormComponent, FacilitytypeListingComponent, FacilitytypeFormComponent
    , CartypeLandingComponent, FacilitytypeLandingComponent,
    CountryLandingComponent,CountryListingComponent,CountryFormComponent,
    AttractionLandingComponent,AttractionListingComponent,AttractionFormComponent,
    CurrencyLandingComponent,CurrencyListingComponent,CurrencyFormComponent,
    FlightClassLandingComponent,FlightClassListingComponent,FlightClassFormComponent,
    RoomTypeLandingComponent,RoomTypeListingComponent,RoomTypeFormComponent,
    StateLandingComponent,StateListingComponent,StateFormComponent,
    WayToReachLandingComponent,WayToReachListingComponent,WayToReachFormComponent, HotelFormComponent, HotelLandingComponent, HotelListingComponent
 ,CityFormComponent,CityLandingComponent,CityListingComponent, BannerLandingComponent, BannerListingComponent, BanneFormComponent, BranchLandingComponent, BranchListingComponent, BranchFormComponent
  ],
  providers: [HeaderVariableService, CartypeService, FacilityTypeService, AleartService,CountryService,
    AttractionService,CurrencyService,FlightClassService,RoomTypeService,StateService,WayToReachService,HotelService
    ,CityService,BannerService,BranchService]
})
export class ManageModule { }