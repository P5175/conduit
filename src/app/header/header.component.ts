import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  islogged!: boolean;
  constructor(private dataservice:DataService){

  }
  ngOnInit(): void {
  this.dataservice.islogged$.subscribe(res=>this.islogged=res);
  
  }
onLogOut(){
  this.dataservice.onlogout();
  
}
}
