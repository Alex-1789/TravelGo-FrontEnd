import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth.service';

interface TripCard {
  id: number;
  date: Date;
  gatheringPlace: string;
  tripName: string;
  rate: number;
  numberOfRates: number;
  achived: number;
  participats: Array<string>;
  tripGuides: Array<number>;
}

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent {
  tripCards: TripCard[] = [];
  hasAccessDelete = false;
  hasAccessArchive = false;
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const headers = this.authService.getHeaders();
    const roles = this.authService.getUserRoles();
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

    roles?.forEach((role) => {
      if (role === 'MODERATOR' || role === 'GUIDE') {
        if (role === 'MODERATOR') {
          this.hasAccessArchive = true;
        }
        this.hasAccessDelete = true;
      }
    });
  }

  deleteTrip(tripId: number): void {
    const headers = this.authService.getHeaders();
    this.http
      .delete<any>('http://localhost:8080/api/trips/' + tripId, { headers })
      .subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.error('Problem while deleting trip', error);
        }
      );
  }

  archiveTrip(tripId: number): void {
    const headers = this.authService.getHeaders();
    this.http
      .put<any>(
        'http://localhost:8080/api/trips/' + tripId + '/archive',
        null,
        {
          headers,
        }
      )
      .subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.error('Problem while archeving trip', error);
        }
      );
  }
}
