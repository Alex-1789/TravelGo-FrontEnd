import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';

interface CommentCard {
  id: number;
  content: string;
  username: string;
  userID: number;
  post: number;
}

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  postId: number = -1;
  commentCards: CommentCard[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });

    const headers = this.authService.getHeaders();

    this.http
      .get<CommentCard[]>(
        'http://localhost:8080/api/posts/' + this.postId + '/comments',
        { headers }
      )
      .subscribe(
        (data) => {
          this.commentCards = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }

  deleteComment(commentId: number): void {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });
      const headers = this.authService.getHeaders();
     this.http
       .delete<any>(
         'http://localhost:8080/api/posts/' + this.postId + '/comments/' + commentId,
         { headers }
       )
       .subscribe(
         (respond) => {
          window.location.reload();
         },
         (error) => {
           console.error('Problem while deleting comment', error);
         }
       );
  }
}
