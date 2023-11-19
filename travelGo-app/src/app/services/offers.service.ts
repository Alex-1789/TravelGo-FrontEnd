import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {OfferCard} from "../types/post-card";

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private readonly headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = authService.getHeaders();
  }

  public getAllOffers(): Observable<OfferCard[]> {
    return this.http.get<OfferCard[]>('http://localhost:8080/api/offer/', {headers: this.headers});
  }

  public deleteOfferCard(offerId: number): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/api/offer/' + offerId, { headers: this.headers });
  }
}
