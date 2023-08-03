import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/model/user.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit{
constructor(private dataservice:DataService){

}
  ngAfterViewInit(): void {
  
  }

@ViewChild('username') username!:ElementRef;
@ViewChild('email') email!:ElementRef;
@ViewChild('password') password!:ElementRef;
user:User={id:0,name:'',email:'',password:'',followingIds:[],favoriteCardIds:[]}

  register(){
  
    this.user.name=this.username.nativeElement.value;
    this.user.password=this.password.nativeElement.value;
    this.user.email=this.email.nativeElement.value;
    console.log(this.user);
    this.dataservice.registerUser(this.user);
  }
}
