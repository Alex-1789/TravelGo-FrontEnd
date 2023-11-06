import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

interface AccountCard {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  privileges: string;
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  hasAccess = false;
  singleAccountCard: AccountCard = {
    id: 0,
    username: '',
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    privileges: '',
  };

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    const headers = this.authService.getHeaders();
    const userId = this.authService.getUserId();
    const roles = this.authService.getUserRoles();

    this.http
      .get<AccountCard>('http://localhost:8080/api/users/' + userId, {
        headers,
      })
      .subscribe(
        (data) => {
          this.singleAccountCard = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );

    roles?.forEach((role) => {
      if (role === 'MODERATOR') {
        this.hasAccess = true;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  deleteUser(userId: number) {
    const headers = this.authService.getHeaders();
    this.http
      .delete<any>('http://localhost:8080/api/users/' + userId, { headers })
      .subscribe(
        (respond) => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Problem while deleting post', error);
        }
      );
  }

  successfulDelete(): void {
    this.toast.success({
      detail: 'Account deleted Successfully!',
      summary: 'Account deleted Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}
