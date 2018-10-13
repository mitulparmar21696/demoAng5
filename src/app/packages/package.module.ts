import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './package.routing';

import { HeaderVariableService } from '../shared/services/headervariable/headervariable.service';
import { TableModule } from 'primeng/table';
import { CountryService } from '../shared/services/country/country.service';
import { CurrencyService } from '../shared/services/currency/currency.service';
import { HotelService } from '../shared/services/hotel/hotel.service';
import { PackagelandingComponent } from './packagelanding/packagelanding.component';
import { PackageListingComponent } from './packagelist/package-listing/package-listing.component';
import { PackageListLandingComponent } from './packagelist/package-landing/package-landing.component';
import { PackageFormComponent } from './packagelist/package-form/package-form.component';
import { PackageFaqComponent } from './packagelist/package-faq/package-faq.component';
import { PackageDetailComponent } from './packagelist/package-detail/package-detail.component';
import { PackageHotelComponent } from './packagelist/package-hotel/package-hotel.component';
import { PackageInclusionComponent } from './packagelist/package-inclusion/package-inclusion.component';
import { PackageInfoComponent } from './packagelist/package-info/package-info.component';
import { PackageItineraryComponent } from './packagelist/package-itinerary/package-itinerary.component';
import { PackageSupportComponent } from './packagelist/package-support/package-support.component';
import { PackagerateComponent } from './packagelist/packagerate/packagerate.component';
import { PackageService } from './packagelist/shared/package.service';
import { PackageimageService } from './packagelist/shared/packageimage.service';
import { PackagerateService } from './packagelist/shared/packagerate.service';
import { PackageinclusionService } from './packagelist/shared/packageinclusion.service';
import { PackagefaqService } from './packagelist/shared/packagefaq.service';
import { PackageinfoService } from './packagelist/shared/packageinfo.service';
import { CommonService } from './packagelist/shared/common.service';

import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DestinationService } from '../tour/tourdestination/shared/destination.service';
import { DestinationphotoService } from '../tour/tourdestination/shared/destinationphoto.service';
import { PackageItineraryService } from './packagelist/shared/package-itinerary.service';
import { PackagesupportService } from './packagelist/shared/packagesupport.service';
import { PackageImagesComponent } from './packagelist/package-images/package-images.component';
import { PackageHotelService } from './packagelist/shared/package-hotel.service';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TableModule,
        EditorModule,
        CalendarModule,
        DialogModule,
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
    declarations: [PackagelandingComponent, PackageListingComponent, PackageListLandingComponent, PackageFormComponent
        , PackageDetailComponent, PackageFaqComponent, PackageHotelComponent, PackageInclusionComponent
        , PackageInfoComponent, PackageItineraryComponent, PackageSupportComponent, PackagerateComponent, PackageImagesComponent],
    providers: [HeaderVariableService, CountryService, CurrencyService
        , HotelService, PackageService, PackageimageService, PackagerateService, PackageinclusionService
        , PackagefaqService, PackageinfoService, CommonService, DestinationService, DestinationphotoService
        , PackageItineraryService, PackagesupportService, PackageimageService, PackageHotelService]
})
export class PackageModule { }