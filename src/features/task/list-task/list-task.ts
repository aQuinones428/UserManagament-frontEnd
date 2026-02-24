import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../users/models/User.model';
import { Task } from '../models/Task.model';
import { TaskService } from '../shared/task-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-list-task',
  imports: [MatTableModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './list-task.html',
  styleUrl: './list-task.scss',
})
export class ListTask {
  displayedColumns: string[] = ['id', 'title', 'status', 'username', 'email', 'actions'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);

  constructor(private taskService: TaskService) {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
      if (response.status === 200) {
        this.dataSource.data = response.body || [];
      }
      },
      error: (error) => {
      this.dataSource.data = [];
      console.error('Error fetching tasks:', error.error);
      if (error.status === 400) {
        alert(error.error);
      } else {
        alert('Error fetching tasks. Please try again later.');
      }
      }
    });
  }

  applyFilter(event: MatSelectChange) {
    const filterValue = event.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateStatus(event: MatSelectChange, task: Task) {
    const newStatus = event.value;
    task.newStatus = +newStatus;
    this.taskService.updateStatusTask(task).subscribe({
      next: (response) => {
      if (response.status === 200) {
        alert('Task status updated successfully.');
        this.getTasks();
      }
      },
      error: (error) => {
      console.error('Error updating task status:', error.error);
      if (error.status === 400) {
        alert(error.error);
      } else {
        alert('Error updating task status. Please try again later.');
      }
      }
    });
  }
}
