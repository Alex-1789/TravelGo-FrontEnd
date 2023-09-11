import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
