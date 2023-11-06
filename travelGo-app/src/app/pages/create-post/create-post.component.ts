import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  postForm: FormGroup;
  selectedImage: File | null = null;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: NgToastService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: ['', Validators.required],
      status: ['Published', Validators.required]
    });
  }

  onImageSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedImage = files[0];
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
    if (this.selectedImage) {
      postData.append('image', this.selectedImage);
    }

    const headers = this.authService.getHeaders();

    this.http
      .post('http://localhost:8080/api/posts/', postData, { headers })
      .subscribe(
        (response) => {
          this.router.navigate(['/forum']);
          this.successfulCreatePost();
        },
        (error) => {
          console.error('Post creating failed:', error);
        }
      );
  }

  successfulCreatePost(): void {
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
