import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../types/user";
import {AuthService} from "../../auth.service";
import {NgToastService} from "ng-angular-popup";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit, OnDestroy {
  public hasAccess = false;
  public user: User | null = null;

  public userDataForm: FormGroup;

  private userSub: any = null
  private updateSub: any = null

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toast: NgToastService
  ) {
    this.userDataForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', ],
    });
  }

  ngOnInit() {
    const userId = this.authService.getUserId();
    const roles = this.authService.getUserRoles();

    if (userId !== null) {
      this.userSub = this.userService.getUser(userId).subscribe(
        (data) => {
          this.user = data
          this.userDataForm.patchValue(data)
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

    if (this.updateSub !== null) {
      this.updateSub.unsubscribe()
    }
  }

  public updateUserData() {
    const userId = this.user?.id
    const userData = this.userDataForm.value

    const requestBody = new FormData();

    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        requestBody.append(key, userData[key]);
      }
    }

    if (userId !== undefined) {
      this.updateSub = this.userService.updateUserProfile(userId, requestBody).subscribe({
        next: () => {
          this.toast.success({
            detail: 'Updated successfully!',
            summary: 'Account data updated successfully!',
            sticky: true,
            position: 'topLeft',
            duration: 2000,
          });
        }
      })
    }
  }
}
