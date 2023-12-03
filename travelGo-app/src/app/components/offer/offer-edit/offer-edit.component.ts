import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {Post} from "../../../types/post";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {OfferService} from "../../../services/offer.service";

@Component({
  selector: 'app-post-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})
export class OfferEditComponent implements OnInit, OnDestroy {

  public post: Post | null = null;
  public postId: number = 0;
  public postForm: FormGroup

  public postImages: File[] | null = null
  public selectedImages: File[] = []

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      about: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.offerService.getOffer(this.postId).subscribe({
      next: value => {
        this.post = value
        this.fetchImagesList(this.postId).subscribe({
          next: images => {
            this.postImages = images
          }
        })
        this.postForm.patchValue({
          title: value.title,
          about: value.about,
          content: value.content
        });
      }
    })
  }

  ngOnDestroy(): void {
  }

  public updatePost() {
    if (this.postForm.invalid) {
      return;
    }

    const postData = new FormData();
    postData.append('title', this.postForm.value.title);
    postData.append('about', this.postForm.value.about);
    postData.append('content', this.postForm.value.content);

    let imagesCount = 0

    this.selectedImages.forEach((image, index) => {
      postData.append('images', image, `image${index}`)
      imagesCount++
    });

    if (this.postImages) {
      this.postImages.forEach((image, index) => {
        postData.append('images', image, `image${index + imagesCount}`);
      });
    }

    this.offerService.updateOffer(this.postId, postData)
      .subscribe({
        next: () => {
          this.toast.success({
            detail: 'Success',
            summary: 'Offer updated successfully',
            sticky: true,
            position: 'topLeft',
            duration: 2000,
          })
          this.router.navigate(['/post'], { queryParams: { id: this.postId } });
        },
        error: err => console.error('Post updating failed:', err)
      });
  }

  public onImageSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
  }

  public getImageUrl(file: File): SafeUrl {
    const objectUrl = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }

  public deleteImage(image: File) {
    if (this.postImages) {
      const index = this.postImages.indexOf(image);
      if (index !== -1) {
        this.postImages.splice(index, 1);
      }
    }
  }

  private fetchImagesList(postId: number): Observable<File[] | null> {
    return this.offerService.getOfferImages(postId).pipe(
      mergeMap(images => {
        const imageUrlObservables = images.map(image => this.getImage(image));
        return forkJoin(imageUrlObservables);
      }),
      catchError(error => {
        console.error('Wystąpił błąd podczas pobierania obrazków:', error);
        return of(null)
      })
    );
  }

  private getImage(fileName: string): Observable<File> {
    return this.offerService.getOfferImage(this.postId, fileName).pipe(
      map((blob: Blob) => {
        return this.blobToFile(blob, fileName);
      })
    );
  }

  private blobToFile(image: Blob, filename: string): File {
    return new File([image], filename)
  }
}
