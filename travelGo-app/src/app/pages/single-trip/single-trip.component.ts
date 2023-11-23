import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Documents, SingleTripCard} from "../../types/trip-types";
import {TripsService} from "../../services/trips.service";
import {NgToastService} from "ng-angular-popup";
import {PostCard} from "../../types/post-card";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit, OnDestroy {
  selectedRating: number = 0
  tripId: number = -1
  documents: Documents[] = []
  tripData: SingleTripCard | null = null

  public discussion: PostCard[] | null = null

  private tripsSub: any
  private discussionSub: any

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
    private toast: NgToastService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    this.tripId = snapshot.queryParams['id']

    this.tripsSub = this.tripsService.getTrip(this.tripId).subscribe({
      next: value => this.tripData = value,
      error: err => console.log("Data trip loading error " + err)
    });

    this.discussionSub = this.tripsService.getTripDiscussion(this.tripId).subscribe({
      next: value => this.discussion = value,
      error: err => console.error("Discussion loading error " + err)
    })
  }

  ngOnDestroy() {
    this.tripsSub.unsubscribe()
    this.discussionSub.unsubscribe()
  }

  public enrollToTrip(): void {
    this.tripsService.enrollToTrip(this.tripId)
      .subscribe({
        next: value => {
          this.toast.success({
            detail: 'Enrolled Successfully!',
            summary: 'Enrolled Successfully!',
            sticky: true,
            position: 'topLeft',
            duration: 2000,
          })
        },
        error: err => {
          this.toast.success({
            detail: 'Enrolled Successfully!',
            summary: 'Enrolled Successfully!',
            sticky: true,
            position: 'topLeft',
            duration: 2000,
          })
        }
      });

    window.location.reload();
  }

  public giveRating(event: any, tripId: number | undefined): void {
    const ratedData = {
      rate: event.detail,
    }
  }

  public refreshDiscussion(data: any): void {
    if (this.tripId) {
      if (this.discussionSub) {
        this.discussionSub.unsubscribe();
      }

      this.discussionSub = this.tripsService.getTripDiscussion(this.tripId).subscribe({
        next: value => this.discussion = value,
        error: err => console.error("Discussion loading error " + err)
      });
    }
  }

  public isCurrentUserEnrolled(): boolean {
    const userId: number | null = this.authService.getUserId()

    if (this.tripData !== null) {
      return this.tripData.participants.some(user => user.id === userId);
    }

    return false
  }

  protected readonly console = console;
}
