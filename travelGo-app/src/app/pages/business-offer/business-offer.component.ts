import {Component} from '@angular/core';
import {OffersService} from "../../services/offers.service";
import {Offer} from "../../types/post";

@Component({
  selector: 'app-business-offer',
  templateUrl: './business-offer.component.html',
  styleUrls: ['./business-offer.component.css']
})
export class BusinessOfferComponent {
  public offerCards: Offer[] = [];
  constructor(private offersService: OffersService) {
    offersService.getAllOffers().subscribe(
      value => {
        this.offerCards = value;
      }
    )
  }

}
