import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../auth/auth.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'login-layout',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  isLoggedIn$: Observable<boolean>;
  private form:any;

  constructor(private _router: Router,private authService: AuthService) { 
    this.form={}
  }

  ngOnInit() {
    
  }
  login(){
    const userName = $('#userName').val().toString();
    const password = $('#password').val().toString();
    
    this.form.userName=userName;
    this.form.password=password;
    if(userName==''){
      alert('Please Enter Username.');
    }
    if(password==''){
      alert('Please Enter Password.');
    }
    if(userName==''||password==''){
      return
    }else{
      if(this.form.userName=='admin' && this.form.password=='admin'){
        this.authService.login(this.form);
      }else{
        alert('Incorrect Username or pasword.');
      }
      
    }
    
    
    
  }

}