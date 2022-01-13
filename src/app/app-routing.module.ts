import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ShowUserComponent } from './users/show-user/show-user.component';
import { UsersComponent } from './users/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'users', component: UsersComponent },
  {
    path: 'user',
    children: [
      { path: 'create', component: AddUserComponent },
      { path: ':id', component: ShowUserComponent },
      { path: 'delete/:id', component: DeleteUserComponent },
      { path: 'edit/:id', component: EditUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
