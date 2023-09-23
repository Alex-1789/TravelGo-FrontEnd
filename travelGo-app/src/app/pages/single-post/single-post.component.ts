import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface SinglePostCard {
  id: number;
  title: string;
  content: string;
  userId: number;
  status: null;
  likes: number;
}

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postId: number = -1;
  singlePostCard: SinglePostCard = {
    id: 0,
    title: '',
    content: '',
    userId: 0,
    status: null,
    likes: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });

    const headers = this.authService.getHeaders();

    this.http
      .get<SinglePostCard>('http://localhost:8080/api/posts/' + this.postId, { headers })
      .subscribe(
        (data) => {
          this.singlePostCard = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }
}
