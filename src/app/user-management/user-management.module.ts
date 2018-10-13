import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementLandingComponent } from './user-management-landing/user-management-landing.component';
import { RouterModule } from '@angular/router';
import { routes } from './user-management-routing.module';
import { AdminListingComponent } from './admin-user/admin-listing/admin-listing.component';
import { AdminFormComponent } from './admin-user/admin-form/admin-form.component';
import { AdminService } from './admin-user/shared/admin.service';
import { FrontUserListingComponent } from './front-user/front-user-listing/front-user-listing.component';
import { FrontUserFormComponent } from './front-user/front-user-form/front-user-form.component';
import { FrontUserService } from './front-user/shared/front-user.service';
import { FrontUserLandingComponent } from './front-user/front-user-landing/front-user-landing.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    TableModule,
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
    //BsDatepickerModule.forRoot(),
  ],
  declarations: [
    UserManagementLandingComponent, 
    AdminListingComponent, 
    AdminFormComponent, 
    FrontUserListingComponent,
    FrontUserFormComponent,
    FrontUserLandingComponent
  ],
  providers:[AdminService, FrontUserService]
})
export class UserManagementModule { }
