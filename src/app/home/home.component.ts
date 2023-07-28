import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Card } from 'src/model/card.model';
import { User } from 'src/model/user.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  cardarray: Card[] = [];
  users: User[] = [];
  activebutton = 'globalfeed';
  populartag: string[] = [];

  @ViewChild('popular_tag') popular_tag!: ElementRef<HTMLDivElement>;
  @ViewChildren('like_button') like_button!: QueryList<ElementRef<HTMLDivElement>>;
  constructor(private dataservice: DataService) {
  }
  ngAfterViewInit(): void {
    this.calculatepopulartag();
   console.log(this.like_button);
   console.log(this.popular_tag);
   
    
  }
  ngOnInit(): void {
    this.dataservice.cardarray$.subscribe(val => this.cardarray = val);
    this.dataservice.users$.subscribe(val => this.users = val);
  }

  toggle(button: string) {
    this.activebutton = button;
    // console.log(this.activebutton);

  }

  toggleLike(id: number) {
    const user = this.users.find((u) => u.userId.toString() == localStorage.getItem('userid'));
    const card = this.cardarray.find((c) => c.cardId == id);
    if (card) {
      if (user?.followingIds.includes(id)) {


        card.likes--;
       let i =user?.followingIds.indexOf(id);
        user.followingIds.splice(i,1);
        
        if(this.like_button){
         
    const array=this.like_button.toArray();
    console.log(array);
    
    
}
      } else {

        card.likes++;
        user?.followingIds.push(id);
      
        if(this.like_button){
          const array=this.like_button.toArray();
          console.log(array);
          }
      }
    }
  }

  calculatepopulartag() {
    const tagmap = new Map<string, { count: number, totallikes: number }>();
    for (const card of this.cardarray) {
      for (const tag of card.tags) {
        if (tagmap.has(tag)) {
          const tagdata = tagmap.get(tag);
          if (tagdata) {
            tagdata.count++;
            tagdata.totallikes += card.likes;
          }
        } else {
          tagmap.set(tag, { count: 1, totallikes: card.likes })
        }
      }
    }

    this.populartag = Array.from(tagmap.entries()).sort((a, b) => b[1].count - a[1].count).map(([val]) => val).slice(0, 5);
    console.log(this.populartag);
    for (let i = 0; i < this.populartag.length; i++) {
      const tag = document.createElement('span');


      tag.innerText = this.populartag[i];
      this.popular_tag.nativeElement!.appendChild(tag);
    }
  }


}
