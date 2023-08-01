import { HtmlParser } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Card } from 'src/model/card.model';
import { User } from 'src/model/user.model';
import { DataService } from 'src/services/data.service';
export interface PaginatedResponse<T> {
  items: Card[];
  total: number;
}
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
  tag:string="";
  activetag:boolean=false;

  @ViewChild('popular_tag') popular_tag!: ElementRef<HTMLDivElement>;
  @ViewChildren('like_button') like_button!: QueryList<ElementRef<HTMLDivElement>>;
  constructor(private render: Renderer2, private dataservice: DataService) {
  }
  ngAfterViewInit(): void {
    this.calculatepopulartag();
    // console.log(this.like_button);
    // console.log(this.popular_tag);


  }
  ngOnInit(): void {
    this.dataservice.cardarray$.subscribe(val => this.cardarray = val);
    this.dataservice.users$.subscribe(val => this.users = val);
    this.onPageChange();
  }

  toggle(button: string) {
    
    this.activebutton = button;
    this.activetag=false;
    this.visibleItems.items=this.cardarray;

  }

  toggleLike(id: number) {
    const user = this.users.find((u) => u.userId.toString() == localStorage.getItem('userid'));
    const card = this.cardarray.find((c) => c.cardId == id);
    if (card) {
      if (user?.favoriteCardIds.includes(id)) {


        card.likes--;

        let i = user?.favoriteCardIds.indexOf(id);
        user.favoriteCardIds.splice(i, 1);

        if (this.like_button) {

          const array = this.like_button.toArray();
          console.log(array);


        }
      } else {

        card.likes++;
        user?.favoriteCardIds.push(id);

        if (this.like_button) {
          const array = this.like_button.toArray();
          console.log(array);
        }
      }
    }
    const cardelement = this.findcardElementById(id);
    if (cardelement) {
      if (user?.favoriteCardIds.includes(id)) {
        this.render.addClass(cardelement, 'like-active');
      } else {
        this.render.removeClass(cardelement, 'like-active');
      }
    }
  }


  findcardElementById(id: number): HTMLElement | null {
    const cardelement = this.like_button.find((ElementRef) => {
      const cardId = parseInt(ElementRef.nativeElement.getAttribute('data-card-id') || '', 10);
      return cardId === id;
    })
    return cardelement ? cardelement.nativeElement : null;
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

    this.populartag = Array.from(tagmap.entries()).sort((a, b) => b[1].totallikes - a[1].totallikes).map(([val]) => val).slice(0, 5);
    console.log(this.populartag);
    for (let i = 0; i < this.populartag.length; i++) {
      const tag = document.createElement('span');
      tag.setAttribute('id', this.populartag[i]);
     
      this.render.listen(tag,'click',(event)=>{
        this.tagClick(this.populartag[i]);
      })


      tag.innerText = this.populartag[i];
      this.popular_tag.nativeElement!.appendChild(tag);
    }
  }

tagClick(tag:string){
  this.visibleItems.items=this.cardarray.filter((card) => card.tags.includes(tag) );
  // console.log("tagclick"+this.visibleItems.items);
  this.activetag=true;
  this.tag=tag
this.activebutton='tagfeed';
  
}

  page: number = 1;
  pageSize: number = 10;


  public visibleItems: PaginatedResponse<number> = {
    items: this.cardarray.slice(0, 10),
    total: this.cardarray.length,
  };
  pageemit(event: any) {
    this.page = event;
    this.onPageChange();
  }
  pagesizeemit(event: any) {
    this.pageSize = event;
    this.onPageChange();
  }
  public onPageChange(): void {
    const startIndex = (this.page - 1) * this.pageSize;


    const items = this.cardarray.slice(
      startIndex,
      startIndex + Number(this.pageSize)
    );


    this.visibleItems = { items, total: this.cardarray.length };
  }


}
