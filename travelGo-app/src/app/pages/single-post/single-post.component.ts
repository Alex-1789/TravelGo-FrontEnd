import {Component, OnInit} from '@angular/core';
import {PostCard} from "../../types/post-card";
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {

  public postCard: Observable<PostCard> | null = null;
  public postId: number = 0;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });
  }

  ngOnInit(): void {
    this.postCard = this.postsService.getPost(this.postId)
  }
}
