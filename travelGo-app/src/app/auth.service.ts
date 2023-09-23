import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private accessToken: string | null = null;

  constructor() {
    // Initialize the authentication state from local storage if available
    const storedToken = localStorage.getItem('Authorization');
    if (storedToken) {
      this.isAuthenticated = true;
      this.accessToken = storedToken;
    }
  }

  // Method to perform login
  login(accessToken: string) {
    this.isAuthenticated = true;
    this.accessToken = accessToken;

    // Store the access token in local storage for persistence
    localStorage.setItem('Authorization', accessToken);
  }

  // Method to perform logout
  logout() {
    this.isAuthenticated = false;
    this.accessToken = null;

    // Remove the access token from local storage
    localStorage.removeItem('Authorization');
  }

  // Method to check if the user is authenticated
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Method to get the access token
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
}
