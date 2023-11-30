import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgToastService} from 'ng-angular-popup';
import {TripsService} from "../../services/trips.service";
import {OffersService} from "../../services/offers.service";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css'],
})
export class CreateOfferComponent implements OnDestroy {
  @Input() tripId : number | null = null
  @Output() refreshPosts = new EventEmitter<string>()

  public postForm: FormGroup
  public selectedImages: File[] = []
  private createPostSub: any = null

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private offerService: OffersService,
    private tripService: TripsService
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (this.createPostSub !== null) {
      this.createPostSub.unsubscribe()
    }
  }

  public onImageSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
  }

  public createOffer() {
    if (this.postForm.invalid) {
      this.emptyCreateOffer();
      return;
    }

    const postData = new FormData();
    postData.append('title', this.postForm.value.title);
    postData.append('about', this.postForm.value.about);
    postData.append('content', this.postForm.value.content);

    this.selectedImages.forEach((image, index) => {
      postData.append('images', image, `image${index}`);
    });

    if (this.tripId === null) {
      this.createPostSub = this.offerService.createOffer(postData)
        .subscribe({
          next: () => {
            this.router.navigate(['/business-offer']);
            this.successfulCreateOffer();
          },
          error: err => console.error('Post creating failed:', err)
        });
    }

    else {
      this.createPostSub = this.tripService.addPostToTripDiscussion(this.tripId, postData)
        .subscribe({
          next: () => {
            this.successfulCreateOffer();
          },
          error: err => console.error('Post creating failed:', err)
        });
    }
  }

  private successfulCreateOffer(): void {
    this.refreshPosts.emit();
    this.postForm.reset()

    this.toast.success({
      detail: 'Offer created Successfully!',
      summary: 'Offer created Successfully!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }

  private emptyCreateOffer(): void {
    this.toast.warning({
      detail: 'Some fields are empty!',
      summary: 'Some fields are empty!',
      sticky: true,
      position: 'topLeft',
      duration: 2000,
    });
  }
}
