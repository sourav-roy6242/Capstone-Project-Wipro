import { Component, Input } from '@angular/core';
import { ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent {
  @Input() claimId!: number;
  file!: File;

  constructor(private claimService: ClaimService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

}
