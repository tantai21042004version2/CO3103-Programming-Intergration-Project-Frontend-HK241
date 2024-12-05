import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artirst-upload-track-cloudinary',
  templateUrl: './artirst-upload-track-cloudinary.component.html',
  styleUrls: ['./artirst-upload-track-cloudinary.component.scss'],
})
export class ArtirstUploadTrackCloudinaryComponent extends BaseComponent {
  selectedFile: File | null = null;
  uploadMessage: string | null = null;

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadMessage = `File "${file.name}" đã được chọn.`;
    }
    this.navigateToAddMetaData();
  }

  navigateToAddMetaData() {
    this.router.navigate(['/artist/tracks/upload-track-meta-data']);
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploadMessage = `Đang tải lên "${this.selectedFile.name}"...`;

      setTimeout(() => {
        this.uploadMessage = `File "${this.selectedFile?.name}" tải lên thành công!`;
        this.selectedFile = null;
      }, 2000);
    } else {
      this.uploadMessage = 'Vui lòng chọn một file trước khi tải lên.';
    }
  }
}
