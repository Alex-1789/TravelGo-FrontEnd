import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../auth.service'
import {Router} from '@angular/router'
import {NgToastService} from 'ng-angular-popup'
import {User} from "../../types/user"
import {UserService} from "../../services/user.service"

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  public hasAccess = false
  public user: User | null = null
  public profileImagePath: string = 'assets/images/avatar.png'

  public selectedImage: File | null = null

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) {
  }

  ngOnInit() {
    const userId = this.authService.getUserId()
    const roles = this.authService.getUserRoles()

    if (userId !== null) {
      this.userService.getUser(userId).subscribe(
        (data) => {
          this.user = data
          this.fetchProfileImage()
        },
        (error) => {
          console.error('Problem while fetching data', error)
        }
      )
    }

    if (roles?.includes('MODERATOR')) {
      this.hasAccess = true
    }
  }

  onLogoutClick() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  deleteUser() {
    // this.http
    //   .delete<any>('http://localhost:8080/api/users/' + this.user?.id, { headers })
    //   .subscribe(
    //     (respond) => {
    //       this.router.navigate(['/'])
    //     },
    //     (error) => {
    //       console.error('Problem while deleting post', error)
    //     }
    //   )
  }

  successfulDelete(): void {
    this.toast.success({
      detail: 'Success',
      summary: 'Account deleted Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    })
  }

  public onImageSelected(event: any) {
    this.selectedImage = event.target.files[0]
  }

  public changeProfileImage() {
    if (this.selectedImage !== null && this.user !== null) {
      const formData: FormData = new FormData()
      formData.append('profileImage', this.selectedImage, this.selectedImage.name)

      this.userService.uploadProfileImage(this.user.id, formData).subscribe({
        next: () => {
          this.toast.success({
            detail: 'Success',
            summary: 'Image uploaded successfully!',
            sticky: true,
            position: 'topLeft',
            duration: 2000,
          })
          window.location.reload()
        }
      })
    }
  }

  private fetchProfileImage() {
    if (this.user !== null) {
      this.userService.getProfileImage(this.user.id).subscribe({
        next: value => {
          this.profileImagePath = URL.createObjectURL(value)
        }
      })
    }
  }

}
