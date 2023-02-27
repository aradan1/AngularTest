import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLoggedIn: boolean = false;
  public user: any;

  private basepath: string = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) { }

  public logout(){
    this.user = null;
    this.isLoggedIn = false;
    localStorage.removeItem("TOKEN");
  }

  public getUser(userId: string): Observable<any>{
    return this.http.get(this.basepath+`/${userId}`);
  }

  public logInUser(user:any): Observable<any>{
    return this.http.post(this.basepath+"/login", user);
  }

  public registerUser(user:any): Observable<any>{
    return this.http.post(this.basepath+"/register", user);
  }

  public deleteUser(userId: string): Observable<any>{
    return this.http.delete(this.basepath+`/${userId}`);
  }

  public putUser(userId:string, user:any): Observable<any>{
    return this.http.put(this.basepath+`/${userId}`, user);
  }
}
