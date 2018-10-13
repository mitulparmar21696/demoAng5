import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './setting-routing.module';

import { HeaderVariableService } from '../shared/services/headervariable/headervariable.service';

// import { SettingLangingComponent } from './setting-langing/setting-langing.component';

import { TableModule } from 'primeng/table';

import { SettingFormComponent } from './settings/setting-form/setting-form.component';
import { SettingLandingComponent } from './settings/setting-landing/setting-landing.component';
import { SettingListingComponent } from './settings/setting-listing/setting-listing.component';
import { SettingLangingComponent } from './setting-langing/setting-langing.component';
import { SettingService } from './settings/shared/setting.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
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
  declarations: [SettingLangingComponent
    ,  SettingFormComponent, SettingLandingComponent, SettingListingComponent, SettingLangingComponent
  ],
  providers: [HeaderVariableService, SettingService ]
})
export class SettingModule { }