import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderprofileComponent } from './headerprofile.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderprofileComponent],
  exports: [HeaderprofileComponent]
})
export class HeaderProfileModule { }