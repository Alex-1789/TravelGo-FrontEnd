import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import {User} from "../../types/user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public hasAccess = false;
  public user: User | null = null

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
      .get<User>('http://localhost:8080/api/users/' + userId + '/profile', {
        headers,
      })
      .subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );

    if (roles?.includes('MODERATOR')) {
      this.hasAccess = true;
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  deleteUser() {
    const headers = this.authService.getHeaders();
    this.http
      .delete<any>('http://localhost:8080/api/users/' + this.user?.id, { headers })
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
