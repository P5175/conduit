import { Injectable } from '@angular/core';
import { User } from 'src/model/user.model';
import { BehaviorSubject } from "rxjs";
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
      localStorage.setItem('userid',user.userId.toString())
      return true;
    } else {
      return false;
    }
  }

  onlogout(){
    this.isLogged.next(false);
    localStorage.removeItem('userid');
  }
   
  onSubmitArticle(card:Card){

  }


}
