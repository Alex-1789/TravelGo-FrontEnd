import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import {Offer} from "../../types/post";

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
})
export class SingleOfferComponent implements OnInit {
  offerId: number = -1;
  singleOfferCard: Offer | null = null
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.offerId = params['id'];
    });

    const headers = this.authService.getHeaders();

    this.http
      .get<Offer>('http://localhost:8080/api/posts/' + this.offerId, {
        headers,
      })
      .subscribe(
        (data) => {
          this.singleOfferCard = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }
}
