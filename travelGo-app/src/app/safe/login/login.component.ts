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
  accessToken: string | null = null;

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
          const accessToken = response.accessToken;

          // Call the AuthService to perform the login action
          this.authService.login(accessToken);

          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
    this.accessToken = null;
  }
}

/*import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  login() {
    const loginData = { email: this.email, password: this.password };

    this.http
      .post<any>('http://localhost:8080/api/auth/login', loginData)
      .subscribe(
        (response) => {
          // Assuming the API returns an object with 'email' and 'accessToken'
          this.isLoggedIn = true;
          this.accessToken = response.accessToken;
          // Save the token to local storage or a secure place
          localStorage.setItem('accessToken', this.accessToken !== null ? this.accessToken : '');
          // Add the token to the request headers
          const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.accessToken}`
          );
          // Now you can use these headers for authenticated requests
          // For example:
          // this.http.get('http://localhost:8080/some/protected/route', { headers }).subscribe(...)
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }

  logout() {
    // Remove the token from local storage or wherever you stored it
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
    this.accessToken = null;
  }
}

/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  submitForm() {
    if(this.form.invalid) {
      return;
    }

    this.apiService
    .login(this.form.get('email')?.value, this.form.get('password')?.value)
    .subscribe((response) => {
      this.router.navigate(['/post']);
    });
  }
}

*/

/*import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

}
*/
