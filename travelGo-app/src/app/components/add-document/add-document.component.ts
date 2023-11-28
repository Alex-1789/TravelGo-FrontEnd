import {Component, Input, OnDestroy} from '@angular/core';
import {TripsService} from "../../services/trips.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnDestroy {
  @Input() tripId: number | null = null

  public selectedImage: File | null = null

  private tripSub: any = null

  constructor(private tripsService: TripsService) {}

  public addDocument() {
    if (this.selectedImage != null && this.tripId !== null) {
      const formData: FormData = new FormData()
      formData.append('fileName', this.selectedImage.name)
      formData.append('title', 'title')
      formData.append('username', '')
      formData.append('file', this.selectedImage, this.selectedImage.name)

      this.tripSub = this.tripsService.createTripDocument(this.tripId, formData).subscribe()
    }
  }

  ngOnDestroy(): void {
    if (this.tripSub !== null) {
      this.tripSub.unsubscribe()
    }
  }

  public onImageSelected(event: any) {
    this.selectedImage = event.target.files[0]
  }
}
