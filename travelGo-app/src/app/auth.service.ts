import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private accessToken: string | null = null;
  private userId: string | null = null;

  constructor() {
    const storedToken = localStorage.getItem('Authorization');
    const idToken = localStorage.getItem('Id');
    if (storedToken) {
      this.isAuthenticated = true;
      this.accessToken = storedToken;
      this.userId = idToken;

    }
  }


  login(response: any) {
    this.isAuthenticated = true;
    this.accessToken = response.accessToken;
    this.userId = response.id;
    localStorage.setItem('Authorization', response.accessToken);
    localStorage.setItem('Id', response.id);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = null;
    this.userId = null;
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Id');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getHeaders(): HttpHeaders {
    const accessToken = this.getAccessToken() ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken,
    });

    return headers;
  }

  getUserId(): string | null {
    return this.userId;
  }
}
