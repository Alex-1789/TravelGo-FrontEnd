import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {PostCard} from "../../types/post-card";
import {catchError, map, Observable, of} from "rxjs";

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
    console.log(this.postCard)
    this.images$ = this.fetchImagesList(this.postId);
  }

  constructor(
    private postsService: PostsService,
    private sanitizer: DomSanitizer
  ) {}

  private fetchImagesList(postId: number): Observable<string[] | null> {

    return this.postsService.getPostImages(postId).pipe(
      map(images => {
        console.log(images)
        return images
      }),
      catchError(error => {
        console.error('Wystąpił błąd podczas pobierania obrazków:', error);
        return of(null)
      })
    );
  }

  public getImageUrl(fileName: string) {
    let imageUrl: SafeUrl = "";



    return fileName;
  }
}
