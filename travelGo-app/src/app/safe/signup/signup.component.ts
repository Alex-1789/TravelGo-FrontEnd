import { Component } from '@angular/core';
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
