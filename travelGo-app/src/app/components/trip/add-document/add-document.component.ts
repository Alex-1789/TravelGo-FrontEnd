import {Component, Input} from '@angular/core';
import {TripService} from "../../../services/trip.service";

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent{
  @Input() tripId: number | null = null

  public selectedImage: File | null = null

  constructor(private tripsService: TripService) {
  }

  public addDocument() {
    if (this.selectedImage != null && this.tripId !== null) {
      const formData: FormData = new FormData()
      formData.append('fileName', this.selectedImage.name)
      formData.append('title', 'title')
      formData.append('username', '')
      formData.append('file', this.selectedImage, this.selectedImage.name)

      this.tripsService.createTripDocument(this.tripId, formData).subscribe()
    }
  }


  public onImageSelected(event: any) {
    this.selectedImage = event.target.files[0]
  }
}
