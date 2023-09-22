import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';

interface CommentCard {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
  created_at: Date;
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

    const accessToken = this.authService.getAccessToken() ?? '';
    const headers = new HttpHeaders({
      Authorization: accessToken,
    });

    this.http
      .get<CommentCard[]>('http://localhost:8080/api/posts/' + this.postId + '/comments', { headers })
      .subscribe(
        (data) => {
          this.commentCards = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }
}
