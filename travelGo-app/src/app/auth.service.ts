import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';

  constructor() {}

  // Store the authentication token
  storeToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  // Retrieve the stored authentication token
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Clear the stored authentication token (sign out)
  clearToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
