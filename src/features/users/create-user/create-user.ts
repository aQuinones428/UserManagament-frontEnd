import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../shared/users-service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss',
})
export class CreateUser {

  createUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.buildForm();
  }

  buildForm() {
    this.createUserForm = this.fb.group({
      name: [''],
      email: ['', Validators.email]
    });
  }


  createUser() {
    if (this.createUserForm.valid) {
      var request: User = {
        name: this.name.value,
        email: this.email.value
      }
      this.usersService.createUser(request).subscribe({
        next: (response) => {
          if (response.status === 200) {
        alert("User created successfully");
        this.createUserForm.reset();
          }
        },
        error: (error) => {
          console.error('Error creating user:', error.error);
          if (error.status === 400) {
        alert(error.error);
          } else {
        alert('Error creating user. Please try again later.');
          }
        }
      });
    }
  }

  get email() {
    return this.createUserForm.controls["email"];
  }
  get name() {
    return this.createUserForm.controls["name"];
  }
}