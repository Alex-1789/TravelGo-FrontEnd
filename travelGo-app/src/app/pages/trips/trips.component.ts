import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Trip} from "../../types/trip-types";
import {TripService} from "../../services/trip.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  trips$: Observable<Trip[]> | null = null

  constructor(
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.trips$ = this.tripService.getAllTrips()
  }
}
