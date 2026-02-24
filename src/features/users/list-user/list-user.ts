import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../models/User.model';
import { UsersService } from '../shared/users-service';


@Component({
  selector: 'app-list-user',
  imports: [MatTableModule],
  templateUrl: './list-user.html',
  styleUrl: './list-user.scss',
})
export class ListUser implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
      if (response.status === 200) {
        this.dataSource.data = response.body || [];
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
}