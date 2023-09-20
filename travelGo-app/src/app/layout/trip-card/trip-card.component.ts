import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface TripCard {
  id: number;
  date: Date;
  gathering_place: string;
  trip_name: string;
  rate: number;
  number_of_rates: number;
  achived: number;
}

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent {
  tripCards: TripCard[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const accessToken = this.authService.getAccessToken() ?? '';
    const headers = new HttpHeaders({
      Authorization: accessToken,
    });

    this.http
      .get<TripCard[]>('http://localhost:8080/api/trips/', { headers })
      .subscribe(
        (data) => {
          this.tripCards = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }
}
