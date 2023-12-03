import {Component} from '@angular/core';
import {Post} from "../../types/post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  public postCards: Post[] = [];

  constructor(
    private postsService: PostService
  ) {
    postsService.getAllPosts().subscribe(
      value => {
        this.postCards = value;
      }
    );
  }

  public reload() {
    window.location.reload()
  }
}
