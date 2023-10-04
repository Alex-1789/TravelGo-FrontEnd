import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
export class AccountComponent {
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
    private router: Router
  ) {}

  ngOnInit() {
    const headers = this.authService.getHeaders();
    const userId = this.authService.getUserId();
    console.log(userId);
    this.http
      .get<AccountCard>('http://localhost:8080/api/users/' + userId, {
        headers,
      })
      .subscribe(
        (data) => {
          console.log(userId);
          this.singleAccountCard = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
