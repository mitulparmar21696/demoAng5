import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './shared/layout/login/login.component';
import { CustomPreloadingStrategy } from './preloading-strategy';


const appRoutes: Routes = [
    { path: 'home',
    canActivate:[AuthGuard],
    component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'manage',
        canActivate:[AuthGuard],
        loadChildren: './manage/manage.module#ManageModule'
    },
    {
        path: 'user_management',
        loadChildren: './user-management/user-management.module#UserManagementModule'
    },
    {
        path: 'tour',
        loadChildren: './tour/tour.module#TourModule',
        //data: { preload: true }
    },
    {
        path: 'packages',
        loadChildren: './packages/package.module#PackageModule',
        //data: { preload: true }
    },
    {
        path: 'attraction',
        loadChildren: './attraction/attraction.module#AttractionModule'
    },
    {
        path: 'documents/document_category',
        loadChildren: './documents/document-category/document-category-routing.module#DocumentCategoryRoutingModule'
    },
    {
        path: 'documents/document_upload',
        loadChildren: './documents/document-upload/document-upload-routing.module#DocumentUploadRoutingModule'
    },
    {
        path: 'settings',
        loadChildren: './settings/setting.module#SettingModule'
    },
    {
        path: 'invoice',
        loadChildren: './invoice/invoice.module#InvoiceModule',        
    },
    {
        path: 'notification',
        loadChildren: './notification/notification.module#NotificationModule',
    },
    {
        path: 'booking',
        loadChildren: './booking/booking.module#BookingModule'
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: CustomPreloadingStrategy })],
    exports: [RouterModule],
    providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule { }
