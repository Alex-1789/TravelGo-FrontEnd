import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';

interface PostCard {
  id: number;
  title: string;
  content: string;
  likes: number;
  username: string;
  about: string;
  updated_at: Date;
  created_at: Date;
  status: null;
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})

export class PostCardComponent implements OnInit {
  postCards: PostCard[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const headers = this.authService.getHeaders();
    console.log(headers);
    this.http
      .get<PostCard[]>('http://localhost:8080/api/posts/', { headers })
      .subscribe(
        (data) => {
          this.postCards = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
  }
}
