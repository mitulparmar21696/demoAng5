import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './booking-routing.module';

import { HeaderVariableService } from '../shared/services/headervariable/headervariable.service';

// import { SettingLangingComponent } from './setting-langing/setting-langing.component';

import { TableModule } from 'primeng/table';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { BookingLandingComponent } from './booking-landing/booking-landing.component';
import { BookingListingComponent } from './booking-listing/booking-listing.component';
import {BookingService} from './shared/booking.service'


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
  declarations: [BookingLandingComponent, BookingListingComponent],
  providers: [ HeaderVariableService,BookingService ]
})
export class BookingModule { }