import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Injectable} from "@angular/core";
import {Documents, SingleTripCard} from "../types/trip-types";
import {Observable} from "rxjs";
import {PostCard} from "../types/post-card";

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private readonly headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = authService.getHeaders();
  }

  public getTrip(tripId: number): Observable<SingleTripCard> {
    return this.http.get<SingleTripCard>('http://localhost:8080/api/trips/' + tripId, {headers: this.headers})
  }

  public getTripDocuments(tripId: number): Observable<Documents[]> {
    return this.http
      .get<Documents[]>('http://localhost:8080/api/trips/' + tripId + '/documents/', {headers: this.headers})
  }

  public rateTrip(tripId: number, rate: {rate: number}): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/trips/' + tripId + '/rate', rate, {headers: this.headers}
    )
  }

  public enrollToTrip(tripId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/trips/' + tripId + '/enroll', {},
      {headers: this.headers});
  }

  public leaveTrip(tripId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/trips/' + tripId + '/withdraw', {},
      {headers: this.headers});
  }

  public getTripDiscussion(tripId: number): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(
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
}
