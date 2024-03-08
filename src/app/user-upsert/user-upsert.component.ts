import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css'],
})
export class UserUpsertComponent {
  userForm!: FormGroup;
  userDataExists: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
    this.route.queryParams.subscribe((params) => {
      if (params['user']) {
        const userData = JSON.parse(params['user']);
        this.userForm.patchValue(userData);
      }
    });
  }

  onSubmit() {
    this.userService
      .isUserDataExists(this.userForm.value)
      .subscribe((exists) => {
        this.userDataExists = exists;

        if (!exists) {
          if (this.userForm.valid) {
            const userData = this.userForm.value;
            console.log(userData);
            this.userService.addUser(userData).subscribe((data) => {
              alert('data is added');
              console.log(data);
            });

            this.router.navigate(['/user-list']);
          } else {
            console.log('Form is invalid');
          }
        }

        // if (exists) {
        //   alert('User data already exists!');
        // } else {

        // }
      });
  }
  showAlluserList() {
    this.router.navigate(['/user-list']);
  }
}
