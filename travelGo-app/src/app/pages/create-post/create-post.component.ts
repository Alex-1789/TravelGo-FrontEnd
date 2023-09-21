import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

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
    private authService: AuthService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  create_post() {
    if (this.postForm.invalid) {
      return;
    }

    const postData = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      status: 1
    };

    const accessToken = this.authService.getAccessToken() ?? '';
    const headers = new HttpHeaders({
       Authorization: accessToken,
    });

    this.http.post<any>('http://localhost:8080/api/posts/', postData, { headers }).subscribe(
      (response) => {
        this.router.navigate(['/forum']);
      },
      (error) => {
        console.error('Post creating failed:', error);
      }
    );
  }
}
