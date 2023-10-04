import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.http
      .post<any>('http://localhost:8080/api/auth/login', loginData)
      .subscribe(
        (response) => {
          this.authService.login(response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }
}
