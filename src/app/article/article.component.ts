import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/model/card.model';
import { User } from 'src/model/user.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  cardId!:string;
  card:Card={
    cardId: 0,
    authorName:'',
    authorId: 0,
    title: '',
    description: '',
    tags: [],
    date: '',
    likes: 0
  };
  User!:User;
  cardarray!:Card[];
constructor(private route:ActivatedRoute,private dataservice:DataService,private router:Router){

}
  ngOnInit(): void {
  this.route.paramMap.subscribe(params=>{
    this.cardId=params.get("cardid") ?? Number(0).toString();
    // console.log(this.cardId);
    
    this.dataservice.cardarray$.subscribe(val=>this.cardarray=val);
  this.card=this.cardarray.find(card=>card.cardId==Number(this.cardId)) ?? {
    cardId: 0,
    authorName:'',
    authorId: 0,
    title: '',
    description: '',
    tags: [],
    date: '',
    likes: 0
  };
  // console.log(this.card);
  })
  
  
 }


 delete(id:number){
this.dataservice.delete(id);
this.router.navigate(["/"]);
 }
edit(id:number){
this.dataservice.edit(id);
}

}
