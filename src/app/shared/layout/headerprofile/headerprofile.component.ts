import { Component, OnInit } from '@angular/core';
import { HeaderVariableService } from '../../services/headervariable/headervariable.service';
import {AuthService} from './../../../auth/auth.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-layout-headerprofile',
  templateUrl: './headerprofile.component.html',
  styleUrls: ['./headerprofile.component.css']
})
export class HeaderprofileComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  sharedHeader : string;
  constructor(private _sharedVariable : HeaderVariableService,private authService: AuthService) { }

  ngOnInit() {
    //this._sharedVariable.sharedHeaderString = "Admin Panel";
    this.sharedHeader =  this._sharedVariable.sharedHeaderString;
  }
  logout(){
    
    this.authService.logout();
  }

}
