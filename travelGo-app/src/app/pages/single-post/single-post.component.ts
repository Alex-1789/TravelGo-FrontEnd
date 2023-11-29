import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../../types/post";
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit, OnDestroy {

  public postCard: Observable<Post> | null = null;
  public postId: number = 0;

  private readonly querySub: any = null

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) {
    this.querySub = this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });
  }

  ngOnInit(): void {
    this.postCard = this.postsService.getPost(this.postId)
  }

  ngOnDestroy(): void {
    if (this.querySub !== null) {
      this.querySub.unsubscribe()
    }
  }
}
