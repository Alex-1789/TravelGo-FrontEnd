import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {PostCard} from "../../types/post-card";
import {catchError, forkJoin, map, mergeMap, Observable, of} from "rxjs";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {

  @Input() postCard: PostCard | null = null
  @Input() postId: number = 0

  public images$: Observable<string[] | null> | undefined;

  ngOnInit(): void {
    this.images$ = this.fetchImagesList(this.postId);
  }

  constructor(
    private postsService: PostsService
  ) {}

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

  public getImageUrl(fileName: string) {
    return this.postsService.getPostImage(this.postId, fileName).pipe(
      map((blob: Blob) => {
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl)
        return imageUrl;
      })
    );
  }
}
