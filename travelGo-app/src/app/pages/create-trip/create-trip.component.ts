import {Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

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
    private authService: AuthService
  ) {
    this.tripForm = this.formBuilder.group({
      date: ['', Validators.required],
      trip_name: ['', Validators.required],
      gathering_place: ['', Validators.required],
    });
  }

  create_trip() {
    if (this.tripForm.invalid) {
      return;
    }

    const tripData = {
      date: this.tripForm.value.date,
      trip_name: this.tripForm.value.trip_name,
      gathering_place: this.tripForm.value.gathering_place,
    };

    const accessToken = this.authService.getAccessToken() ?? '';
    const headers = new HttpHeaders({
      Authorization: accessToken,
    });

    this.http
      .post<any>('http://localhost:8080/api/trips/', tripData, { headers })
      .subscribe(
        (response) => {
          this.router.navigate(['/trips']);
        },
        (error) => {
          console.error('Trip creating failed:', error);
        }
      );
  }
}
