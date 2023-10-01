import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface TripCard {
  id: number;
  date: Date;
  gatheringPlace: string;
  tripName: string;
  rate: number;
  numberOfRates: number;
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
    const headers = this.authService.getHeaders();

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
