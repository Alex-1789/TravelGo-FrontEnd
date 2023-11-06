import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent {
  postId: number = -1;
  commentForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toast: NgToastService
  ) {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  create_comment() {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });
    if (this.commentForm.invalid) {
      return;
    }

    const commentData = {
      content: this.commentForm.value.content,
    };

    const headers = this.authService.getHeaders();

    this.http
      .post<any>(
        'http://localhost:8080/api/posts/' + this.postId + '/comments',
        commentData,
        { headers }
      )
      .subscribe(
        (response) => {
          window.location.reload();
          this.successfulCreateComment();
        },
        (error) => {
          console.error('Post creating failed:', error);
        }
      );
  }

  successfulCreateComment(): void {
    this.toast.success({
      detail: 'Comment created Successfully!',
      summary: 'Comment created Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}
