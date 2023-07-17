import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private dataservice:DataService,private router:Router){}
 @ViewChild('username') username!:ElementRef;
  
  @ViewChild('password') password!:ElementRef;
  
  
    login(){
    
      const name=this.username.nativeElement.value;
     const password=this.password.nativeElement.value;
      
      
     if( this.dataservice.loginUser(name,password)==true){
      this.router.navigateByUrl("/");
      
     }else{
      this.router.navigateByUrl("/register")
     };
    }
}
