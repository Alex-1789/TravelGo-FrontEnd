import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface SinglePostCard {
  id: number;
  title: string;
  content: string;
  username: string;
  userID: number;
  about: string;
  createdAt: Date;
  imagesDir: string;
  status: number;
  likes: number;
}

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postId: number = -1;
  imagesNames: string[] = [];
  image: SafeUrl | undefined;

  singlePostCard: SinglePostCard = {
    id: 0,
    title: '',
    content: '',
    username: '',
    userID: 0,
    about: '',
    createdAt: new Date(2023, 1, 1),
    imagesDir: '',
    status: 0,
    likes: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });

    const headers = this.authService.getHeaders();
    let objectURL = null;

    this.http
      .get<string[]>('http://localhost:8080/api/files/posts/' + this.postId, {
        headers,
      })
      .subscribe(
        (data) => {
          this.imagesNames = data;
          if (this.imagesNames.length > 0) {
            this.imagesNames.forEach((imageName) => {
              this.http
                .get(
                  'http://localhost:8080/api/files/posts/' +
                    this.postId +
                    `/${encodeURIComponent(imageName)}`,
                  { responseType: 'blob', headers }
                )
                .subscribe(
                  (data) => {
                    objectURL = URL.createObjectURL(data);
                    this.image =
                      this.sanitizer.bypassSecurityTrustUrl(objectURL);
                  },
                  (error) => {
                    console.error('Problem while fetching data', error);
                  }
                );
            });
          }
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );

    this.http
      .get<SinglePostCard>('http://localhost:8080/api/posts/' + this.postId, {
        headers,
      })
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
