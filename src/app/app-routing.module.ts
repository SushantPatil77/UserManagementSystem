import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-Upsert', pathMatch: 'full' }, // Default route
  { path: 'user-list', component: UserListComponent }, // Route for UserListComponent
  { path: 'user-Upsert', component: UserUpsertComponent },// Route for UserUpsert
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
