import {Component, Input} from '@angular/core';
import {OfferCard} from "../../types/post-card";
import {Observable} from "rxjs";
import {OffersService} from "../../services/offers.service";

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
})
export class OfferCardComponent {
  @Input() offerCard: OfferCard | null = null
  @Input() offerId: number = 0

  public images$: Observable<string[] | null> | undefined;

  constructor(
    private offersService: OffersService
  ) {}

  deleteOffer(offerId: number): void {
    this.offersService.deleteOfferCard(offerId).subscribe()
  }
}
