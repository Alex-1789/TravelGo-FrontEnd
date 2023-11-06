import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

interface UserCard {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  privileges: string;
  roles: Array<any>;
}

@Component({
  selector: 'app-moderator-user-access',
  templateUrl: './moderator-user-access.component.html',
  styleUrls: ['./moderator-user-access.component.css'],
})
export class ModeratorUserAccessComponent {
  userCards: UserCard[] = [];
  selectedValue: string = 'CLUB_MEMBER';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const headers = this.authService.getHeaders();

    this.http
      .get<UserCard[]>('http://localhost:8080/api/users', {
        headers,
      })
      .subscribe(
        (data) => {
          this.userCards = data;
        },
        (error) => {
          console.error('Problem while fetching users', error);
        }
      );
  }

  onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedValue = target.value;
    }
  }

  addPrivlage(userId: number) {
    const headers = this.authService.getHeaders();

    const permissionData = {
      permissionKey: this.selectedValue,
    };
    this.http
      .post<any>(
        'http://localhost:8080/api/users/' + userId + '/permission',
        permissionData,
        {
          headers,
        }
      )
      .subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.error('Problem while fetching users', error);
        }
      );
  }

  removePrivlage(userId: number) {
    const headers = this.authService.getHeaders();

    const permissionData = {
      permissionKey: this.selectedValue,
    };
    this.http
      .delete<any>('http://localhost:8080/api/users/' + userId + '/permission', {
        headers,
        body: permissionData,
      })
      .subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.error('Problem while fetching users', error);
        }
      );
  }
}
