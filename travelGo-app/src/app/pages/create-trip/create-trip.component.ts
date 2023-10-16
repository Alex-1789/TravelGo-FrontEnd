import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css'],
})
export class CreateTripComponent {
  tripForm: FormGroup;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService
  ) {
    this.tripForm = this.formBuilder.group({
      date: ['', Validators.required],
      tripName: ['', Validators.required],
      gatheringPlace: ['', Validators.required],
    });
  }

  createTrip() {
    if (this.tripForm.invalid) {
      this.emptyCreateTrip();
      return;
    }

    const tripData = {
      date: this.tripForm.value.date,
      tripName: this.tripForm.value.tripName,
      gatheringPlace: this.tripForm.value.gatheringPlace,
    };

    const headers = this.authService.getHeaders();

    this.http
      .post<any>('http://localhost:8080/api/trips/', tripData, { headers })
      .subscribe(
        (response) => {
          this.router.navigate(['/trips']);
          this.successfulCreateTrip();
        },
        (error) => {
          console.error('Trip creating failed:', error);
        }
      );
  }

  successfulCreateTrip(): void {
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
