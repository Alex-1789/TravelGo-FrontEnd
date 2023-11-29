import {Component} from '@angular/core';
import {Post} from "../../types/post";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  public postCards: Post[] = [];

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
