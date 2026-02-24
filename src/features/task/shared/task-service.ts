import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../users/models/User.model';
import { Task } from '../models/Task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  serverUrl = environment.Api.task;
  headers: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getTasks() {
    return this.http.get<Task[]>(`${this.serverUrl}`, { headers: this.headers, observe: 'response' });
  }

  createTask(task: Task) {
    return this.http.post(`${this.serverUrl}`, task, { headers: this.headers, observe: 'response' });
  }

  updateStatusTask(task: Task) {
    return this.http.put(`${this.serverUrl}/${task.id}/status`, task, { headers: this.headers, observe: 'response' });
  }
}
