import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {Offer, Post} from "../types/post";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private readonly headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = authService.getHeaders();
  }

  public getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('http://localhost:8080/api/offer/', {headers: this.headers});
  }

  public getOffer(postId: number): Observable<Post> {
    return this.http.get<Post>('http://localhost:8080/api/posts/' + postId, {headers: this.headers});
  }

  public deleteOfferCard(offerId: number): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/api/offer/' + offerId, { headers: this.headers });
  }

  public createOffer(offerData: FormData) {
    const headers = this.headers
    headers.append('Content-Type', 'multipart/form-data')
    return this.http.post('http://localhost:8080/api/offer/', offerData, {headers: headers})
  }

  public updateOffer(offerId: number, postData: FormData) {
    return this.http.post(`http://localhost:8080/api/offer/${offerId}`, postData, { headers: this.headers });
  }

  public getOfferImages(postId: number): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/files/posts/' + postId, {headers: this.headers});
  }

  public getOfferImage(postId: number, fileName: string): Observable<Blob> {
    return this.http.get('http://localhost:8080/api/files/posts/' + postId + `/${encodeURIComponent(fileName)}`,
      {responseType: 'blob', headers: this.headers});
  }
}
