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
      id: [''],
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
            // here Check if the form is valid
            // Determine operation type Add or Update based on id
            const type = this.userForm.value.id ? 'Update' : 'Add';

            // Call UserService to add or update user data
            this.userService
              .addUser(this.userForm.value, type)
              .subscribe((data) => {
                // Navigate to user list
                this.router.navigate(['/user-list']);
                // Reset the form after successful submission
                this.userForm.reset();
              });
          }

          // if (exists) {
          //   alert('User data already exists!');
          // } else {

          // }
        }
      });

    // if (this.userForm.value.firstName) {
    //   var type = this.userForm.value.id == null ? 'Add' : 'Update';
    //   this.userService.addUser(this.userForm.value, type).subscribe((data) => {
    //     this.router.navigate(['/user-list']);
    //   });
    // }
  }

  showAlluserList() {
    // Navigate to user list
    this.router.navigate(['/user-list']);
  }
}
