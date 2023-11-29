import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {Post, UpdatePostRequest} from "../../types/post";
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit, OnDestroy {

  public post: Post | null = null;
  public postId: number = 0;
  public postForm: FormGroup

  public images$: Observable<string[] | null> | undefined;
  public selectedImages: File[] = []

  private readonly querySub: any = null
  private postSub: any = null
  private imagesSub: any = null
  private updatePostSub: any = null

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {
    this.querySub = this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postSub = this.postsService.getPost(this.postId).subscribe({
      next: value => {
        this.post = value
        this.images$ = this.fetchImagesList(this.postId);
        this.postForm.patchValue({
          title: value.title,
          about: value.about,
          content: value.content
        });
      }
    })
  }

  ngOnDestroy(): void {
    if (this.querySub !== null) {
      this.querySub.unsubscribe()
    }

    if (this.postSub !== null) {
      this.postSub.unsubscribe()
    }

    if (this.imagesSub !== null) {
      this.imagesSub.unsubscribe()
    }

    if (this.updatePostSub !== null) {
      this.updatePostSub.unsubscribe()
    }
  }

  public updatePost() {
    if (this.postForm.invalid) {
      return;
    }

    const updateRequest: UpdatePostRequest = {
      title: this.postForm.value.title,
      about: this.postForm.value.about,
      content: this.postForm.value.content
    };

    this.updatePostSub = this.postsService.updatePost(this.postId, updateRequest)
      .subscribe({
        next: () => {
          console.log("post updated");
          window.location.reload();
        },
        error: err => console.error('Post updating failed:', err)
      });
  }

  public onImageSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
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
