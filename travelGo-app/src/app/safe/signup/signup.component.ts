import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      surname: ['', [Validators.required, Validators.minLength(1)]],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp(): void {
    if (this.signUpForm.invalid) {
      this.emptySignUp();
      return;
    }

    const signUpData = {
      name: this.signUpForm.value.name,
      surname: this.signUpForm.value.surname,
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };

    this.http
      .post<any>('http://localhost:8080/api/auth/signup', signUpData)
      .subscribe(
        (response) => {
          this.router.navigate(['/']);
          this.successfulSignUp();
        },
        (error) => {
          if (error.status === 400) {
            this.badSignUp(error.error.message);
          }
          console.error('SignUp failed:', error);
        }
      );
  }

  successfulSignUp(): void {
    this.toast.success({
      detail: 'Signed In Successfully!',
      summary: 'Signed In Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }

  badSignUp(message: string): void {
    this.toast.error({
      detail: message + '!',
      summary: message + '!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }

  emptySignUp(): void {
    this.toast.warning({
      detail: 'Some field in form are empty!',
      summary: 'Some field in form are empty!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}
