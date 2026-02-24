import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../shared/task-service';
import { User } from '../../users/models/User.model';
import { Task } from '../models/Task.model';
import { UsersService } from '../../users/shared/users-service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-task',
  imports: [
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './create-task.html',
  styleUrl: './create-task.scss',
})
export class CreateTask {
  createTaskForm!: FormGroup;
  users?: User[] = [];
  constructor(private fb: FormBuilder, private taskService: TaskService,private userService: UsersService) {
    this.buildForm()
    this.getUsers();
  }

  buildForm() {
    this.createTaskForm = this.fb.group({
      title: ['', Validators.required],
      user: ['', Validators.required]
    });
  }

  createTask() {
    if (this.createTaskForm.valid) {
      var request: Task = {
        title: this.title?.value,
        user: this.user?.value as User
      }
      this.taskService.createTask(request).subscribe({
        next: (response) => {
          if (response.status === 200) {
        alert("Task created successfully");
        this.createTaskForm.reset();
          } else {
        console.error("Error creating task", response);
        alert("Error creating task");
          }
        },
        error: (error) => {
          console.error('Error creating task:', error.error);
          if (error.status === 400) {
        alert(error.error);
          } else {
        alert('Error creating task. Please try again later.');
          }
        }
      });
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.users = response.body ?? [];
        } else {
          console.error("Error fetching users", response);
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error.error);
        if (error.status === 400) {
          alert(error.error);
        } else {
          alert('Error fetching users. Please try again later.');
        }
      }
    });
  }

  get title() {
    return this.createTaskForm.get('title');
  }
  get user() {
    return this.createTaskForm.get('user');
  }
}
