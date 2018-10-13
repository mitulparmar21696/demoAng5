import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';

import { HeaderModule } from './shared/layout/header/header.module';
import { HeaderProfileModule } from './shared/layout/headerprofile/headerprofile.module';
import { FooterModule } from './shared/layout/footer/footer.module';
import { LoginModule } from './shared/layout/login/login.module';
import { ServicesModule } from './shared/services/services.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TourModule } from './tour/tour.module';
import { PackageModule } from './packages/package.module';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import * as $ from 'jquery';
import { ManageModule } from './manage/manage.module';
import { AttractionModule } from './attraction/attraction.module';
import { SettingModule } from './settings/setting.module';
import { UserManagementModule } from './user-management/user-management.module';
import { DocumentUploadRoutingModule } from './documents/document-upload/document-upload-routing.module';
import { DocumentCategoryRoutingModule } from './documents/document-category/document-category-routing.module';
import { InvoiceModule } from './invoice/invoice.module';
import { NotificationModule } from './notification/notification.module';
import {BookingModule} from './booking/booking.module'
// import 'datatables.net';
//import { DataTableModule } from 'angular5-data-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HeaderModule,
    LoginModule,
    HeaderProfileModule,
    FooterModule,
    ServicesModule,
    DashboardModule,
    TourModule,
    PackageModule,
    ManageModule,
    AttractionModule,
    SettingModule,
    UserManagementModule,
    DocumentUploadRoutingModule,
    DocumentCategoryRoutingModule,
    InvoiceModule,
    NotificationModule,
    BookingModule 
  ],
  providers: [AuthGuard,AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
