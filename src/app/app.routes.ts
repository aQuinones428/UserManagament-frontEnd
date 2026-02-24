import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: 'list',
                loadComponent: () => import('../features/users/list-user/list-user').then(m => m.ListUser)
            },
            {
                path: 'create',
                loadComponent: () => import('../features/users/create-user/create-user').then(m => m.CreateUser)
            }
        ]
    },
    {
        path: 'tasks',
        children: [
            {
                path: 'list',
                loadComponent: () => import('../features/task/list-task/list-task').then(m => m.ListTask)
            },
            {
                path: 'create',
                loadComponent: () => import('../features/task/create-task/create-task').then(m => m.CreateTask)
            }
        ]
    },];
