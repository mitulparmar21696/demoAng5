import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogin:any;
  private msg = new BehaviorSubject('s');
  constructor(
    private router: Router
  ) {}
  get isLoggedIn() {
    

    return this.loggedIn.asObservable();
  }
  
  login(user: User) {
    
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      localStorage.setItem("token", "123456");
      this.router.navigate(['/home']);
    }
  }
  getMessage(): Observable<any> {
    var token=localStorage.getItem("token");
    if(token=='123456'){
      this.loggedIn.next(true);
    }else{
      this.loggedIn.next(false);
    }
    return this.loggedIn;
  }


  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem("token");
    localStorage.removeItem("firstLoad");
    this.router.navigate(['/login']);
  }
}
