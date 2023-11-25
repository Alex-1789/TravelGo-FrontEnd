import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent {
  @Input() rating: number | null | undefined = null
  @Input() numberOfRates: number | undefined = 0
}
