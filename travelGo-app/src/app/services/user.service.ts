import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {User} from "../types/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = authService.getHeaders();
  }

  public getUser(userId: number): Observable<User> {
    return this.http
      .get<User>('http://localhost:8080/api/users/' + userId + '/profile', {headers: this.headers})
  }

  public updateUserProfile(userId: number, profileData: any) {
    return this.http
      .post('http://localhost:8080/api/users/' + userId + '/profile', profileData, {headers: this.headers})
  }
}
