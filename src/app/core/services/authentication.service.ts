import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js'; 

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>("");
  public currentUser: Observable<any>;
  accountType : any;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('currentUser')) {
      let userDetails = CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), environment.costplanner.encryptionKey).toString(CryptoJS.enc.Utf8);
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(userDetails));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string) {
    
    return this.http.post<any>(`${environment.costplanner.host}/authenticate/user`, { userName, password })
      .pipe(map(result => {
        
        // login successful if there's a jwt token in the response
        if (result.user && result.token) {
          
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', CryptoJS.AES.encrypt(JSON.stringify({ user: result.user, token: result.token }), environment.costplanner.encryptionKey).toString());
          this.currentUserSubject = new BehaviorSubject<any>({user: result.user});
        }
        return result;
      }));
  }


  getAccountType () {
    return this.currentUserSubject.value.user.tbl_auth.accountType;
  }

  /**
  * Reset password
  * @param userName userName
  */
 
  resetPassword(userName: string) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/user/reset-password`, { userName })
      .pipe(map(result => {
        return result;
    }));
  }
 
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('modules'); 
    this.currentUserSubject.next(null);
  }
}
