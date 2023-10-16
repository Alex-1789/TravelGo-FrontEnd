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
    });
  }

  createPost() {
    if (this.postForm.invalid) {
      this.emptyCreatePost();
      return;
    }

    const postData = {
      title: this.postForm.value.title,
      about: this.postForm.value.about,
      content: this.postForm.value.content,
      status: 1
    };

    const headers = this.authService.getHeaders();

    this.http.post<any>('http://localhost:8080/api/posts/', postData, { headers }).subscribe(
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
