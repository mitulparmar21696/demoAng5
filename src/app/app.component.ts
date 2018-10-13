import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth/auth.service'
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  private isLogin:any ;

  isLoggedIn$: Observable<boolean>;
  msg$:Observable<string>
  subscription: Subscription;
  constructor(private _router: Router,private authService: AuthService, private route:ActivatedRoute) {
    this.isLogin=true;
 
    this.subscription = this.authService.getMessage().subscribe(message => { 
      this.isLoggedIn$ = message;
      if(message==false){
        this._router.navigate(['/login']);
      }else{
        if(window.location.pathname=='/login'){
          this._router.navigate(['/home']);
        }
      }
    });

  }
  ngOnInit() {  
  }
 
}
