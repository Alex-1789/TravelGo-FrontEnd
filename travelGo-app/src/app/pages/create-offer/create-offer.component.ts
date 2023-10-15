import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css'],
})
export class CreateOfferComponent {
  offerForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.offerForm = this.formBuilder.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  createOffer() {
    if (this.offerForm.invalid) {
      return;
    }

    const offerData = {
      title: this.offerForm.value.title,
      content: this.offerForm.value.content,
      about: this.offerForm.value.about
    };

    const headers = this.authService.getHeaders();

    this.http
      .post<any>('http://localhost:8080/api/offer/', offerData, { headers })
      .subscribe(
        (response) => {
          this.router.navigate(['/business-offer']);
        },
        (error) => {
          console.error('Offer creating failed:', error);
        }
      );
  }
}
