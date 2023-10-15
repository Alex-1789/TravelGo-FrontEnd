import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgToastService } from 'ng-angular-popup';

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
    private router: Router,
    private toast: NgToastService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.emptyLogin();
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
          this.successfulLogin();
        },
        (error) => {
          if (error.status === 401) {
            this.badLogin();
          }
          console.error('Login failed:', error);
        }
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.authService.logout();
  }

  successfulLogin(): void {
    this.toast.success({
      detail: 'Logged In Successfully!',
      summary: 'Logged In Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }

  badLogin(): void {
    this.toast.error({
      detail: 'Wrong Login or Password!',
      summary: 'Wrong Login or Password!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }

  emptyLogin(): void {
    this.toast.warning({
      detail: 'Empty Email or Password!',
      summary: 'Empty Email or Password!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}

