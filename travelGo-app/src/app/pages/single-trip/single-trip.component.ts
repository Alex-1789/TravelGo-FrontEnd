import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Documents, Trip} from "../../types/trip-types";
import {TripService} from "../../services/trip.service";
import {NgToastService} from "ng-angular-popup";
import {Post} from "../../types/post";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit, OnDestroy {
  tripId: number = -1
  documents: Documents[] = []
  tripData: Trip | null = null

  public discussion: Post[] | null = null

  private tripsSub: any | null = null
  private discussionSub: any | null = null
  private rateSub: any | null = null
  private enrollToTripSub: any | null = null
  private leaveTripSub: any | null = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private toast: NgToastService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    this.tripId = snapshot.queryParams['id']

    this.tripsSub = this.tripService.getTrip(this.tripId).subscribe({
      next: value => {
        this.tripData = value
        console.log(this.tripData)
      },
      error: err => console.log("Data trip loading error " + err)
    });

    this.discussionSub = this.tripService.getTripDiscussion(this.tripId).subscribe({
      next: value => this.discussion = value,
      error: err => console.error("Discussion loading error " + err)
    })

  }

  ngOnDestroy() {
    if (this.tripsSub !== null) {
      this.tripsSub.unsubscribe()
    }

    if (this.discussionSub !== null) {
      this.discussionSub.unsubscribe()
    }

    if (this.rateSub !== null) {
      this.rateSub.unsubscribe()
    }

    if (this.enrollToTripSub !== null) {
      this.enrollToTripSub.unsubscribe()
    }

    if (this.leaveTripSub !== null) {
      this.leaveTripSub.unsubscribe()
    }
  }

  public enrollToTrip(): void {
    this.enrollToTripSub = this.tripService.enrollToTrip(this.tripId)
      .subscribe();

    window.location.reload();
  }

  public LeaveTrip() {
    this.leaveTripSub = this.tripService.leaveTrip(this.tripId)
      .subscribe();

    window.location.reload();
  }

  public giveRating(event: any): void {
    const ratedData: { rate: number } = {
      rate: event.detail,
    }

    if (this.rateSub !== null) {
      this.rateSub.unsubscribe()
    }

    this.rateSub = this.tripService.rateTrip(this.tripId, ratedData).subscribe({
      next: () => {
        this.refreshTripData()
      }
    })
  }

  public refreshDiscussion(): void {
    if (this.tripId) {
      if (this.discussionSub) {
        this.discussionSub.unsubscribe();
      }

      if (this.discussionSub !== null) {
        this.discussionSub.unsubscribe()
      }

      this.discussionSub = this.tripService.getTripDiscussion(this.tripId).subscribe({
        next: value => this.discussion = value,
        error: err => console.error("Discussion loading error " + err)
      });
    }
  }

  public isCurrentUserMember(): boolean {
    const userId: number | null = this.authService.getUserId()

    if (this.tripData !== null && userId !== null) {
      return this.tripData.participants.some(user => user.id === userId);
    }

    return false
  }

  public isCurrentUserGuide(): boolean {
    const userId: number | null = this.authService.getUserId()

    if (this.tripData !== null && userId !== null) {
      return this.tripData.tripGuides.some(user => user.id === userId)
    }

    return false
  }

  protected readonly console = console;

  public archiveTrip() {
    if (this.tripData) {
      this.tripService.archiveTrip(this.tripData?.id).subscribe({
        next: () => {
          this.router.navigate(['/trips'])
        }
      })
    }
  }

  private refreshTripData(): void {
    if (this.tripsSub !== null) {
      this.tripsSub.unsubscribe()
    }

    this.tripsSub = this.tripService.getTrip(this.tripId).subscribe({
      next: value => this.tripData = value,
      error: err => console.log("Data trip loading error " + err)
    });
  }
}
