import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {User} from "../types/user";
import {Observable} from "rxjs";
import {Post} from "../types/post";

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

  public uploadProfileImage(userId: number, image: FormData) {
    return this.http
      .post('http://localhost:8080/api/users/' + userId + '/profile', image, {headers: this.headers})
  }

  public getProfileImage(userId: number): Observable<Blob> {
    return this.http.get('http://localhost:8080/api/files/profile/' + userId,
      {responseType: 'blob', headers: this.headers});
  }
}
