import { Injectable } from '@angular/core';
import { User } from 'src/model/user.model';
import { BehaviorSubject, Subject } from "rxjs";
import { Card } from 'src/model/card.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private users: User[] = [];
  private cards:Card[]=[];
  private generateUserIds: number = 1;
  private isLogged = new BehaviorSubject<boolean>(false);
  islogged$ = this.isLogged.asObservable();
  cardid$=new BehaviorSubject(1);
cardarray$=new BehaviorSubject(this.cards);



  

  registerUser(user: User) {
    user.userId = this.generateUserIds;
    this.users.push(user);
    this.generateUserIds++;
    console.log(this.users);

  }

  loginUser(name: string, password: string): boolean {
    const user = this.users.find((u) => u.name === name && u.password === password);
    if (user) {
      this.isLogged.next(true);
<<<<<<< HEAD
      localStorage.setItem('userid',user.userId.toString())
=======
      localStorage.setItem('userid',user.userId.toString());
      localStorage.setItem('username',user.name);
>>>>>>> 25ed608389ef1baac9549f7cb9d967486a8138df
      return true;
    } else {
      return false;
    }
  }

  onlogout(){
    this.isLogged.next(false);
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
  }
   
  onSubmitArticle(card:Card){
     this.cards.push(card);
     this.cardarray$.next(this.cards);
     console.log(this.cards);
     
  }


}
