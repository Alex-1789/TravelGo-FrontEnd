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

  public login(response: any) {
    this.isAuthenticated = true;

    let Response = {
      Id: response.id,
      Authorization: response.accessToken,
      Roles: response.roles,
    };

    localStorage.setItem('Response', JSON.stringify(Response));
  }

  public logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('Response');
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public getAccessToken(): string | null {
    let valueInStorage = localStorage.getItem('Response');
    let user = JSON.parse(valueInStorage ?? '');
    return user.Authorization;
  }

  public getHeaders(): HttpHeaders {
    const accessToken = this.getAccessToken() ?? '';
    return new HttpHeaders({
      Authorization: 'Bearer ' + accessToken,
    });
  }

  public getUserId(): number | null {
    let valueInStorage = localStorage.getItem('Response');
    let user = JSON.parse(valueInStorage ?? '');
    return user.Id;
  }

  public getUserRoles(): string[] | null {
    let valueInStorage = localStorage.getItem('Response');
    let user = JSON.parse(valueInStorage ?? '');
    return user.Roles.map((role: any) => role.name);
  }

  public isModerator(): boolean {
    return <boolean>this.getUserRoles()?.includes('MODERATOR')
  }

  public isBusinessPartner(): boolean {
    return <boolean>this.getUserRoles()?.includes('BUSINESS_PARTNER')
  }
}
