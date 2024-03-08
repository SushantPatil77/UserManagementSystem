import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  userList: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserList().subscribe((data) => {
      this.userList = data;
    });
  }

  editUser(user: any) {
    this.userService.getUserById(user.id).subscribe((data) => {
      console.log('user getById is successfully....');
      console.log(data);
      //nagavite to user-Upsert component
      this.router.navigate(['/user-Upsert'], {
        queryParams: { user: JSON.stringify(data) },
      });
    });
  }

  deleteUser(user: any) {
    this.userService.deleteUserByID(user.id).subscribe(() => {
      console.log('user delete successfully');
    });
    // Refresh the user list
    this.userService.getUserList().subscribe((data) => {
      this.userList = data;
    });
  }
}
