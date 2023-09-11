import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      surname: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
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
        },
        (error) => {
          console.error('SignUp failed:', error);
        }
      );
  }
}

/*import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public signUpForm!: FormGroup;
  public signUpForm2!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      username: [''],
      email: [''],
      password: [''],
    });
  }

  signUp() {
    this.http
      .post<any>('http://localhost:8080/api/auth/signup', this.signUpForm.value)
      .subscribe(
        (res) => {
          alert('SIGNUP SUCCESFUL');
          this.signUpForm.reset();
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}

/*import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

}*/
