import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { }

  updatePassword(data) {
    return this.http.post<any>(`${environment.costplanner.host}/administrator/user/update-password`, { data })
      .pipe(map(result => {
        return result;
      }));
  }

}
