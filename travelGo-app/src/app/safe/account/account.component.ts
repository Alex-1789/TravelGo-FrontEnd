import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {User} from "../../types/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy {
  public hasAccess = false;
  public user: User | null = null

  private userSub: any = null

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    const roles = this.authService.getUserRoles();

    if (userId !== null) {
      this.userSub = this.userService.getUser(userId).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Problem while fetching data', error);
        }
      );
    }

    if (roles?.includes('MODERATOR')) {
      this.hasAccess = true;
    }
  }

  ngOnDestroy(): void {
    if (this.userSub !== null) {
      this.userSub.unsubscribe()
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  deleteUser() {
    // this.http
    //   .delete<any>('http://localhost:8080/api/users/' + this.user?.id, { headers })
    //   .subscribe(
    //     (respond) => {
    //       this.router.navigate(['/']);
    //     },
    //     (error) => {
    //       console.error('Problem while deleting post', error);
    //     }
    //   );
  }

  successfulDelete(): void {
    this.toast.success({
      detail: 'Account deleted Successfully!',
      summary: 'Account deleted Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}
