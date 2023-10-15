import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface OfferCard {
  id: number;
  title: string;
  content: string;
  username: string;
  userID: number;
  about: string;
  createdAt: Date;
  status: null;
  likes: number;
  liked: boolean;
}

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
})
export class OfferCardComponent implements OnInit {
  offerCards: OfferCard[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const headers = this.authService.getHeaders();
    this.http
      .get<OfferCard[]>('http://localhost:8080/api/offer/', { headers })
      .subscribe(
        (data) => {
          this.offerCards = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }


}
