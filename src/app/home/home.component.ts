import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/model/card.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  cardarray:Card[]=[];
  activebutton='globalfeed';
  populartag:string[]=[];
  @ViewChild('tagContainer') popular_tag!: ElementRef<HTMLDivElement>;
 
constructor(private dataservice:DataService){
}
  ngOnInit(): void {
    this.dataservice.cardarray$.subscribe(val=>this.cardarray=val);
    this.calculatepopulartag();
  }

  toggle(button:string){
this.activebutton=button;
// console.log(this.activebutton);

  }

  calculatepopulartag(){
    const tagmap=new Map<string,{count:number,totallikes:number}>();
    for(const card of this.cardarray){
      for(const tag of card.tags){
        if(tagmap.has(tag)){
          const tagdata=tagmap.get(tag);
        if(tagdata){
          tagdata.count++;
          tagdata.totallikes+=card.likes;
        }
        }else{
          tagmap.set(tag,{count:1,totallikes:card.likes})
        }
      }
    }

    this.populartag=Array.from(tagmap.entries()).sort((a,b)=>b[1].count-a[1].count).map(([val])=>val).slice(0,5);
    console.log(this.populartag);
    for(let i=0;i<this.populartag.length;i++){

    }
  }


}
