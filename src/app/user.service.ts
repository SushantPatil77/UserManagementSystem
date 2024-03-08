import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly Url = 'http://localhost:3000/';

  constructor(private https: HttpClient) {}

  addUser(userData: User): Observable<any> {
    return this.https.post(this.Url + 'User', userData);
  }

  getUserList(): Observable<User[]> {
    return this.https.get<User[]>(this.Url + 'User');
  }

  deleteUserByID(id: any): Observable<any> {
    return this.https.delete(this.Url + 'User/' + id);
  }

  getUserById(id: any): Observable<User> {
    return this.https.get<User>(this.Url + 'User/' + id);
  }

  isUserDataExists(userData: User): Observable<boolean> {
    return this.getUserList().pipe(
      map((users: User[]) =>
        users.some(
          (user) =>
            user.firstname === userData.firstname &&
            user.lastName === userData.lastName &&
            user.email === userData.email &&
            user.address === userData.address &&
            user.phone === userData.phone
        )
      )
    );
  }
}
