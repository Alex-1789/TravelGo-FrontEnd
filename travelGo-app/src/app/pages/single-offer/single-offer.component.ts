import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface SingleOfferCard {
  id: number;
  title: string;
  content: string;
  username: string;
  userID: number;
  about: string;
  createdAt: Date;
  status: null;
  likes: number;
}

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
})
export class SingleOfferComponent implements OnInit {
  offerId: number = -1;
  singleOfferCard: SingleOfferCard = {
    id: 0,
    title: '',
    content: '',
    username: '',
    userID: 0,
    about: '',
    createdAt: new Date(),
    status: null,
    likes: 0,
  };
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
      .get<SingleOfferCard>('http://localhost:8080/api/posts/' + this.offerId, {
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
