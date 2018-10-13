import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './tour.routing';

import { HeaderVariableService } from '../shared/services/headervariable/headervariable.service';
import { TourtypeService } from './tourtype/shared/tourtype.service';
import { TourcategoryService } from './tourcategory/shared/tourcategory.service';
import { TourlandingComponent } from './tourlanding/tourlanding.component';
import { TourtypeListComponent } from './tourtype/tourtype-list/tourtype-list.component';
import { TourtypeFormComponent } from './tourtype/tourtype-form/tourtype-form.component';
import { TourcategoryListingComponent } from './tourcategory/tourcategory-listing/tourcategory-listing.component';
import { TourcategoryFormComponent } from './tourcategory/tourcategory-form/tourcategory-form.component';
import { TableModule } from 'primeng/table';
import { TourtypeLandingComponent } from './tourtype/tourtype-landing/tourtype-landing.component';
import { TourcategoryLandingComponent } from './tourcategory/tourcategory-landing/tourcategory-landing.component';
import { TourdestinationLandingComponent } from './tourdestination/tourdestination-landing/tourdestination-landing.component';
import { TourdestinationListingComponent } from './tourdestination/tourdestination-listing/tourdestination-listing.component';
import { TourdestinationFormComponent } from './tourdestination/tourdestination-form/tourdestination-form.component';
import { DestinationComponent } from './tourdestination/destination/destination.component';
import { InclusionComponent } from './tourdestination/inclusion/inclusion.component';
import { FaqComponent } from './tourdestination/faq/faq.component';
import { DocumentComponent } from './tourdestination/document/document.component';
import { DestinationService } from './tourdestination/shared/destination.service';
import { DestinationinclusionService } from './tourdestination/shared/destinationinclusion.service';
import { DestinationfaqService } from './tourdestination/shared/destinationfaq.service';
import { DestinationtermsService } from './tourdestination/shared/destinationterms.service';
import { CountryService } from '../shared/services/country/country.service';
import { CurrencyService } from '../shared/services/currency/currency.service';
import { CommonService } from './tourdestination/shared/common.service';
import { HotelService } from '../shared/services/hotel/hotel.service';
import { DestinationimageComponent } from './tourdestination/destinationimage/destinationimage.component';
import { ArrayToStringService } from '../shared/services/ArrayToString.service';
import { DestinationphotoService } from './tourdestination/shared/destinationphoto.service';

import { EditorModule } from 'primeng/editor';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TableModule,
    EditorModule,
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
  declarations: [TourlandingComponent, TourtypeListComponent, TourtypeFormComponent
    , TourcategoryListingComponent, TourcategoryFormComponent, TourtypeLandingComponent
    , TourcategoryLandingComponent, TourdestinationLandingComponent, TourdestinationListingComponent
    , TourdestinationFormComponent, DestinationComponent, InclusionComponent, FaqComponent, DocumentComponent, DestinationimageComponent],
  providers: [HeaderVariableService, CountryService, CurrencyService
    , TourtypeService, TourcategoryService
    , DestinationService, DestinationphotoService, DestinationinclusionService, DestinationfaqService, DestinationtermsService
    , CommonService, HotelService, ArrayToStringService]
})
export class TourModule { }