import {Component} from '@angular/core';
import {PostCard} from "../../types/post-card";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  public postCards: PostCard[] = [];

  constructor(
    private postsService: PostsService
  ) {
    postsService.getAllPosts().subscribe(
      value => {
        this.postCards = value;
      }
    );
  }
}
