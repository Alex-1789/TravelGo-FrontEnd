import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit, OnChanges {
  @Input() userId: number | null = null
  public profileImagePath: string = 'assets/images/avatar.png'

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue) {
      console.log(changes['userId']);
      this.fetchProfileImage(changes['userId'].currentValue);
    }
  }

  private fetchProfileImage(userId: number) {
    this.userService.getProfileImage(userId).subscribe({
      next: value => {
        this.profileImagePath = URL.createObjectURL(value)
      }
    })
  }
}
