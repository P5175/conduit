export interface User{
    id:number;
    name:string;
    email:string;
    password:string;
    followingIds:number[];
    favoriteCardIds:number[];
}