import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface SingleTripCard {
  id: number;
  date: Date;
  gathering_place: string;
  trip_name: string;
  rate: number;
  number_of_rates: number;
  achived: boolean;
}
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit {
  tripId: number = -1;
  singleTripCard: SingleTripCard = {
    id: 0,
    date: new Date(2023,1,1),
    gathering_place: '',
    trip_name: '',
    rate: 0,
    number_of_rates: 0,
    achived: false
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tripId = params['id'];
    });

    const accessToken = this.authService.getAccessToken() ?? '';
    const headers = new HttpHeaders({
      Authorization: accessToken,
    });

    this.http
      .get<SingleTripCard>('http://localhost:8080/api/trips/' + this.tripId, {
        headers,
      })
      .subscribe(
        (data) => {
          this.singleTripCard = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }
}
