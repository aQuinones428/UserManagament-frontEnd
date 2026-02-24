import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  serverUrl = environment.Api.users;
  headers: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getUsers() {
    return this.http.get<User[]>(`${this.serverUrl}`, { headers: this.headers, observe: 'response' });
  }

  createUser(user: User) {
    return this.http.post(`${this.serverUrl}`, user, { headers: this.headers, observe: 'response' });
  }
}
