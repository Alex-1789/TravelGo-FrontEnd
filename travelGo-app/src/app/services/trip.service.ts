import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";
import {Document, Rate, Trip} from "../types/trip-types";
import {Observable} from "rxjs";
import {Post} from "../types/post";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private readonly headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = authService.getHeaders();
  }

  public getTrip(tripId: number): Observable<Trip> {
    return this.http.get<Trip>('http://localhost:8080/api/trips/' + tripId, {headers: this.headers})
  }

  public getAllTrips(): Observable<Trip[]> {
    return this.http
      .get<Trip[]>('http://localhost:8080/api/trips/', {headers: this.headers})
  }

  public archiveTrip(tripId: number) {
    return this.http
      .put<any>('http://localhost:8080/api/trips/' + tripId + '/archive', null, {headers: this.headers})
  }

  public deleteTrip(tripId: number) {
    return this.http
      .delete<any>('http://localhost:8080/api/trips/' + tripId, {headers: this.headers})
  }

  public createTripDocument(tripId: number, params: any) {
    return this.http.post('http://localhost:8080/api/trips/' + tripId + '/documents/', params, {headers: this.headers})
  }


  public getTripDocuments(tripId: number): Observable<Document[]> {
    return this.http
      .get<Document[]>('http://localhost:8080/api/trips/' + tripId + '/documents/', {headers: this.headers})
  }

  public rateTrip(tripId: number, rate: { rate: number }): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/trips/' + tripId + '/rate', rate, {headers: this.headers}
    )
  }

  public getRates(tripId: number): Observable<Rate[]> {
    return this.http.get<Rate[]>('http://localhost:8080/api/trips/' + tripId + '/rates', {headers: this.headers})
  }

  public enrollToTrip(tripId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/trips/' + tripId + '/enroll', {},
      {headers: this.headers});
  }

  public leaveTrip(tripId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/trips/' + tripId + '/withdraw', {},
      {headers: this.headers});
  }

  public getTripDiscussion(tripId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      'http://localhost:8080/api/trips/' + tripId + '/discussion', {headers: this.headers}
    );
  }

  public addPostToTripDiscussion(tripId: number, postData: FormData) {
    return this.http.post(
      'http://localhost:8080/api/trips/' + tripId + '/discussion', postData, {headers: this.headers}
    )
  }

  public createTrip(tripData: any) {
    return this.http.post<any>('http://localhost:8080/api/trips/', tripData, {headers: this.headers})
  }

  public getTripDocument(documentId: number): Observable<Blob> {
    return this.http.get('http://localhost:8080/api/files/documents/' + documentId,
      {responseType: 'blob', headers: this.headers});
  }
}
