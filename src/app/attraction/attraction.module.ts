import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './attraction-routing.module';

import { HeaderVariableService } from '../shared/services/headervariable/headervariable.service';

// import { SettingLangingComponent } from './setting-langing/setting-langing.component';

import { TableModule } from 'primeng/table';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

 
import { AttractionLandingComponent } from './attraction-landing/attraction-landing.component';
import { AttractionListingComponent } from './attractiondetails/attraction-listing/attraction-listing.component';
import { AttractionFormComponent } from './attractiondetails/attraction-form/attraction-form.component';
import { AttractiondetailsLandingComponent } from './attractiondetails/attractiondetails-landing/attractiondetails-landing.component';
import { AttractionService } from './attractiondetails/shared/attraction.service';
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
  declarations: [AttractionLandingComponent, AttractionListingComponent, AttractionFormComponent, AttractiondetailsLandingComponent
  ],
  providers: [,AttractionService, HeaderVariableService ]
})
export class AttractionModule { }