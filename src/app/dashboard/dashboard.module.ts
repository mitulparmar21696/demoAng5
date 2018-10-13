import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { routes } from './dashboard.routing';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
  declarations: [DashboardComponent]
})
export class DashboardModule { }