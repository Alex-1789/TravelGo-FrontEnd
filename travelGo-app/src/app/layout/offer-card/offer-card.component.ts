import {Component, Input, OnInit} from '@angular/core';
import {Offer} from "../../types/post";
import {catchError, forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {OffersService} from "../../services/offers.service";
import {PostsService} from "../../services/posts.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
})
export class OfferCardComponent implements OnInit {
  @Input() offerCard: Offer | null = null
  @Input() offerId: number = 0

  public images$: Observable<string[] | null> | undefined;

  constructor(
    private offersService: OffersService,
    private postsService: PostsService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.images$ = this.fetchImagesList(this.offerId);
  }

  deleteOffer(offerId: number): void {
    this.offersService.deleteOfferCard(offerId).subscribe()
    window.location.reload()
  }

  public isCurrentUserAuthor() {
    return this.authService.getUserId() === this.offerCard?.userID
  }

  public isCurrentUserModerator() {
    return this.authService.isModerator()
  }


  private fetchImagesList(postId: number): Observable<string[] | null> {
    return this.postsService.getPostImages(postId).pipe(
      mergeMap(images => {
        const imageUrlObservables = images.map(image => this.getImageUrl(image));
        return forkJoin(imageUrlObservables);
      }),
      catchError(error => {
        console.error('Wystąpił błąd podczas pobierania obrazków:', error);
        return of(null)
      })
    );
  }

  private getImageUrl(fileName: string) {
    return this.postsService.getPostImage(this.offerId, fileName).pipe(
      map((blob: Blob) => {
        return URL.createObjectURL(blob);
      })
    );
  }
}
