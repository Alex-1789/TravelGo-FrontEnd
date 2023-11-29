import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Post} from "../../types/post";
import {catchError, forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit, OnDestroy {

  @Input() postCard: Post | null | undefined = null
  @Input() postId: number = 0
  @Input() displayedImagesCount: number = 9
  @Input() joinDiscussionButton: boolean = true
  @Input() showFullContent: boolean = false

  public images$: Observable<string[] | null> | undefined;
  public profileImagePath: string = 'assets/images/avatar.png'

  private profileImageSub: any = null

  ngOnInit(): void {
    this.images$ = this.fetchImagesList(this.postId);
    this.fetchProfileImage()
  }

  ngOnDestroy(): void {
    if (this.profileImageSub !== null) {
      this.profileImageSub.unsubscribe()
    }
  }

  constructor(
    private postsService: PostsService,
    private userService: UserService
  ) {}

  public async likePost(): Promise<void> {
    try {
      await this.postsService.likePost(this.postId).toPromise();
      this.postCard = await this.fetchUpdatedPostCard(this.postId).toPromise();
    } catch (error) {
      console.error('Error liking post', error);
    }
  }

  public async unlikePost(): Promise<void> {
    try {
      await this.postsService.dislikePost(this.postId).toPromise();
      this.postCard = await this.fetchUpdatedPostCard(this.postId).toPromise();
    } catch (error) {
      console.error('Error unliking post', error);
    }
  }

  public async deletePost(): Promise<void> {
    try {
      await this.postsService.deletePost(this.postId).toPromise();
    } catch (error) {
      console.error('Error deleting post', error);
    }
  }

  private fetchUpdatedPostCard(postId: number): Observable<Post | null> {
    return this.postsService.getPost(postId);
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
    return this.postsService.getPostImage(this.postId, fileName).pipe(
      map((blob: Blob) => {
        return URL.createObjectURL(blob);
      })
    );
  }

  private fetchProfileImage() {
    if (this.postCard !== undefined && this.postCard !== null) {
      this.profileImageSub = this.userService.getProfileImage(this.postCard.userID).subscribe({
        next: value => {
          this.profileImagePath = URL.createObjectURL(value)
        }
      })
    }
  }
}
