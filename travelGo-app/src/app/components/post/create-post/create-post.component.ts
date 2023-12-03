import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgToastService} from 'ng-angular-popup';
import {PostService} from "../../../services/post.service";
import {TripService} from "../../../services/trip.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnDestroy {
  @Input() tripId : number | null = null
  @Output() refreshPosts = new EventEmitter<string>()

  public postForm: FormGroup
  public selectedImages: File[] = []
  private createPostSub: any = null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private postsService: PostService,
    private tripService: TripService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: ['', Validators.required],
      status: ['Published', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.createPostSub !== null) {
      this.createPostSub.unsubscribe()
    }
  }

  onImageSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i])
      }
    }
  }

  createPost() {
    if (this.postForm.invalid) {
      this.emptyCreatePost();
      return;
    }

    const postData = new FormData();
    postData.append('title', this.postForm.value.title);
    postData.append('about', this.postForm.value.about);
    postData.append('content', this.postForm.value.content);
    postData.append('status', this.postForm.value.status);

    this.selectedImages.forEach((image, index) => {
      postData.append('images', image, `image${index}`);
    });

    if (this.tripId === null) {
      this.createPostSub = this.postsService.createPost(postData)
        .subscribe({
          next: () => {
            this.router.navigate(['/forum']);
            this.successfulCreatePost();
          },
          error: err => console.error('Post creating failed:', err)
        });
    }

    else {
      this.createPostSub = this.tripService.addPostToTripDiscussion(this.tripId, postData)
        .subscribe({
          next: () => {
            this.successfulCreatePost()
          },
          error: err => console.error('Post creating failed:', err)
        });
    }
  }

  successfulCreatePost(): void {
    this.refreshPosts.emit();
    this.postForm.reset()

    this.toast.success({
      detail: 'Post created Successfully!',
      summary: 'Post created Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }

  emptyCreatePost(): void {
    this.toast.warning({
      detail: 'Some fields are empty!',
      summary: 'Some fields are empty!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}
