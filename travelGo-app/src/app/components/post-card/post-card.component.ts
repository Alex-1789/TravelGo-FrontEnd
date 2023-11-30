import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Post} from "../../types/post";
import {catchError, forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../auth.service";

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {

    @Input() postCard: Post | null = null
    @Input() postId: number = 0
    @Input() displayedImagesCount: number = 9
    @Input() joinDiscussionButton: boolean = true
    @Input() showFullContent: boolean = false

    public images$: Observable<string[] | null> | undefined;

    ngOnInit(): void {
        this.images$ = this.fetchImagesList(this.postId);
    }

    constructor(
        private postsService: PostsService,
        private userService: UserService,
        private authService: AuthService
    ) {
    }

    public async likePost(): Promise<void> {
        console.log("Like")
        this.postsService.likePost(this.postId).subscribe({
            next: () => {
                this.fetchUpdatedPostCard(this.postId)
            }
        })
    }

    public unlikePost(): void {
        this.postsService.dislikePost(this.postId).subscribe({
            next: () => {
                this.fetchUpdatedPostCard(this.postId)
            }
        })
    }

    public async deletePost(): Promise<void> {
        try {
            await this.postsService.deletePost(this.postId).toPromise();
        } catch (error) {
            console.error('Error deleting post', error);
        }
    }

    public isCurrentUserAuthor(): boolean {
        return this.postCard?.userID === this.authService.getUserId()
    }

    private fetchUpdatedPostCard(postId: number) {
        this.postsService.getPost(postId).subscribe({
            next: value => {
                this.postCard = value
            }
        });
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
}
