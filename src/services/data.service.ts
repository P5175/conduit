import { Injectable } from '@angular/core';
import { User } from 'src/model/user.model';
import { BehaviorSubject, Subject } from "rxjs";
import { Card } from 'src/model/card.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private userurl="http://localhost:3000/user";

  constructor(private httpservice:HttpClient) { }

  private users: User[] = [];
  // private activeUser:User=
  private cards: Card[] = [];
  // private generateUserIds: number = 1;
  private isLogged = new BehaviorSubject<boolean>(false);
  islogged$ = this.isLogged.asObservable();
  cardid$ = new BehaviorSubject(1);
  cardarray$ = new BehaviorSubject(this.cards);
  users$ = new BehaviorSubject(this.users);

  currentid:number=0;


  registerUser(user: User) {
    // console.log(user);
this.httpservice.post("http://localhost:3000/user",user).subscribe();

   
    
    // user.userId = this.generateUserIds;
    // this.users.push(user);
    // this.generateUserIds++;
    console.log(this.users);

  }

  loginUser(name: string, password: string): boolean {

    this.httpservice.get<User[]>("http://localhost:3000/user").subscribe(user=>this.users=user)
    const user = this.users.find((u) => u.name === name && u.password === password);
    if (user) {
      this.isLogged.next(true);
      localStorage.setItem('userid', user.id.toString());
      localStorage.setItem('username', user.name);
      return true;
    } else {
      return false;
    }
  }

  onlogout() {
    this.isLogged.next(false);
    localStorage.removeItem('userid');
    localStorage.removeItem('username');

  }

  onSubmitArticle(card: Card,edit:boolean) {
    console.log(edit);
    console.log(card.cardId-1);
    
    if(edit){
      this.cards[card.cardId-1]=card;
    }
    else{
    
    this.cards.push(card);}
  
    this.cardarray$.next(this.cards);
    console.log(this.cards);

  }
  delete(id: number) {
     this.cards=this.cards.filter((card)=>card.cardId!=id);
     this.cardarray$.next(this.cards);
     console.log(this.cards);
     
  }
  

}
