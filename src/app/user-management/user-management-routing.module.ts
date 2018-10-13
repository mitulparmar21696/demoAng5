import { Routes } from "@angular/router";
import { UserManagementLandingComponent } from "./user-management-landing/user-management-landing.component";
import { AdminLandingComponent } from "./admin-user/admin-landing/admin-landing.component";
import { AdminListingComponent } from "./admin-user/admin-listing/admin-listing.component";
import { AdminFormComponent } from "./admin-user/admin-form/admin-form.component";
import { FrontUserListingComponent } from "./front-user/front-user-listing/front-user-listing.component";
import { FrontUserFormComponent } from "./front-user/front-user-form/front-user-form.component";
import { FrontUserLandingComponent } from "./front-user/front-user-landing/front-user-landing.component";

export const routes: Routes = [
  {
    path:'',
    component: UserManagementLandingComponent,
    children:[
      {
        path:'admin_user',
        children: [
          {
            path:'',
            pathMatch:'full',
            component: AdminListingComponent
          },
          {
            path: 'form',
            component: AdminFormComponent
          }
        ]
      },
      {
        path: 'front_user',
        // component: FrontUserLandingComponent,
        children: [
          {
            path:'',
            pathMatch:'full',
            component: FrontUserListingComponent
          },
          {
            path:'form',
            component: FrontUserFormComponent
          }
        ]
      },
    ]
  }
]