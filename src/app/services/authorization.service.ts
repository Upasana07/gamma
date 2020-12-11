import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  configUrl = 'http://34.121.49.132'
  constructor(private http: HttpClient) { }
  userDetails = new BehaviorSubject([]);
  user = this.userDetails.asObservable();
  updateUser(newResource, newResourceId) {
    this.userDetails.next([newResource, newResourceId]);
    localStorage.setItem('isLoggedIn', 'true');
  }
  checkCredentials(payload): Observable<any>{
    return this.http.post(`${this.configUrl}/login`,payload);
  }
  loginExistingUser(param): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('email_id', param)
    return this.http.get(`${this.configUrl}/user`,{params});
  }
  getUserDetails(userId) {
    let params : HttpParams = new HttpParams();
    params = params.append('email_id', userId)
    return this.http.get(`${this.configUrl}/user_job_history`, {params});
  }
  createNewUser(payload) {
    return this.http.post(`${this.configUrl}/sign_up`, payload);
  }
  addUserExperience(data) {
    return this.http.post(`${this.configUrl}/user_job_history`, data);
  }
}
