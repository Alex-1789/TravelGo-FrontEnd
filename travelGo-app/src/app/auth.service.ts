import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {
    const storedToken = localStorage.getItem('Response');
    if (storedToken) {
      this.isAuthenticated = true;
    }
  }

  login(response: any) {
    this.isAuthenticated = true;

    let Response = {
      Id: response.id,
      Authorization: response.accessToken,
      Roles: response.roles,
    };

    localStorage.setItem('Response', JSON.stringify(Response));
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('Response');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getAccessToken(): string | null {
    let valueInStorage = localStorage.getItem('Response');
    let user = JSON.parse(valueInStorage ?? '');
    return user.Authorization;
  }

  getHeaders(): HttpHeaders {
    const accessToken = this.getAccessToken() ?? '';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken,
    });

    return headers;
  }

  getUserId(): number | null {
    let valueInStorage = localStorage.getItem('Response');
    let user = JSON.parse(valueInStorage ?? '');
    return user.Id;
  }

  getUserRoles(): string[] | null {
    let valueInStorage = localStorage.getItem('Response');
    let user = JSON.parse(valueInStorage ?? '');
    let rolesNames = user.Roles.map((role: any) => role.name);
    return rolesNames;
  }
}
