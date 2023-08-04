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
  // cardid$ = new BehaviorSubject(1);
  cardarray$ = new BehaviorSubject(this.cards);
  users$ = new BehaviorSubject(this.users);

  
  loadCard(){
   return this.httpservice.get<Card[]>("http://localhost:3000/card");
   
    
   
  }


  registerUser(user: User) {
    // console.log(user);
this.httpservice.post("http://localhost:3000/user",user).subscribe();

   
    
   
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
    
    if(edit){
      this.httpservice.put("http://localhost:3000/card/card.id",card).subscribe();
    }
    else{
    
      this.httpservice.post("http://localhost:3000/card",card).subscribe();
    }
  
    this.cardarray$.next(this.cards);
    console.log(this.cards);

  }
  delete(id: number) {
     this.cards=this.cards.filter((card)=>card.id!=id);
     this.cardarray$.next(this.cards);
     console.log(this.cards);
     
  }
  

}
