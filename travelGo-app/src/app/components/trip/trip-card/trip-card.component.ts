import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../../auth.service';
import {Trip} from "../../../types/trip-types";
import {TripService} from "../../../services/trip.service";

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {
  @Input() tripData: Trip | null = null

  constructor(
    private tripService: TripService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

  }

  public archiveTrip() {
    if (this.tripData) {
      this.tripService.archiveTrip(this.tripData?.id).subscribe({
        next: () => {
          window.location.reload()
        }
      })
    }
  }

  public deleteTrip() {

  }

  public isCurrentUserGuide(): boolean {
    const userId: number | null = this.authService.getUserId()

    if (this.tripData !== null && userId !== null) {
      return this.tripData.tripGuides.some(user => user.id === userId)
    }

    return false
  }

  public isCurrentUserModerator() {
    return this.authService.isModerator()
  }
}
