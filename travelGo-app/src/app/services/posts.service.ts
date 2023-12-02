import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";
import {Post} from "../types/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = authService.getHeaders();
  }

  public getPostImages(postId: number): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/files/posts/' + postId, {headers: this.headers});
  }

  public getPostImage(postId: number, fileName: string): Observable<Blob> {
    return this.http.get('http://localhost:8080/api/files/posts/' + postId + `/${encodeURIComponent(fileName)}`,
      {responseType: 'blob', headers: this.headers});
  }

  public getPost(postId: number): Observable<Post> {
    return this.http.get<Post>('http://localhost:8080/api/posts/' + postId, {headers: this.headers});
  }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/api/posts/', {headers: this.headers});
  }

  public likePost(postId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/posts/' + postId + '/like', {},
      {headers: this.headers});
  }

  public dislikePost(postId: number): Observable<any> {
    const likeData = {
      postId: postId,
    };

    return this.http.post<any>('http://localhost:8080/api/posts/' + postId + '/unlike', likeData,
      {headers: this.headers});
  }

  public getPostLikes(postId: number): Observable<number> {
    return this.http.get<any>('http://localhost:8080/api/posts/' + postId + '/likes', {headers: this.headers});
  }

  public deletePost(postId: number): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/api/posts/' + postId, {headers: this.headers})
  }

  public createPost(postData: FormData) {
    const headers = this.headers
    headers.append('Content-Type', 'multipart/form-data')
    return this.http.post('http://localhost:8080/api/posts/', postData, {headers: headers})
  }

  public updatePost(postId: number, postData: FormData) {
    return this.http.post(`http://localhost:8080/api/posts/${postId}`, postData, { headers: this.headers });
  }
}
