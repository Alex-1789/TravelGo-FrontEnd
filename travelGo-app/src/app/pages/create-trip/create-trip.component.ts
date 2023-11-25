import {Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgToastService } from 'ng-angular-popup';
import {TripsService} from "../../services/trips.service";

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css'],
})
export class CreateTripComponent implements OnDestroy {
  public tripForm: FormGroup;

  private createTripSub: any | null = null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService,
    private tripService: TripsService,
  ) {
    this.tripForm = this.formBuilder.group({
      date: ['', Validators.required],
      tripName: ['', Validators.required],
      gatheringPlace: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.createTripSub !== null) {
      this.createTripSub.unsubscribe()
    }
  }

  public createTrip() {
    if (this.tripForm.invalid) {
      this.emptyCreateTrip();
      return;
    }

    const guideId = this.authService.getUserId()

    if (guideId !== null) {
      const tripData = {
        date: this.tripForm.value.date,
        tripName: this.tripForm.value.tripName,
        gatheringPlace: this.tripForm.value.gatheringPlace,
        guidesIDs: [guideId.toString()],
        description: this.tripForm.value.description
      };

      this.createTripSub = this.tripService.createTrip(tripData).subscribe(
        {
          next: () => {
            this.router.navigate(['/trips']);
            this.successfulCreateTrip();
          },
          error: err => {
            console.error('Trip creating failed:', err);
          }
        }
      )
    }
  }

  public successfulCreateTrip(): void {
    this.toast.success({
      detail: 'Trip created Successfully!',
      summary: 'Trip created Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }

  emptyCreateTrip(): void {
    this.toast.warning({
      detail: 'Some fields are empty!',
      summary: 'Some fields are empty!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}
