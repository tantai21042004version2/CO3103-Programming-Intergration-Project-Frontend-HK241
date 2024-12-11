import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from 'src/app/models/artirst';
import { state } from '@angular/animations';
import { CloudinaryResponse } from 'src/app/responses/song/cloudinary';

@Component({
  selector: 'app-artirst-upload-track-cloudinary',
  templateUrl: './artirst-upload-track-cloudinary.component.html',
  styleUrls: ['./artirst-upload-track-cloudinary.component.scss'],
})
export class ArtirstUploadTrackCloudinaryComponent extends BaseComponent implements OnInit {
  selectedFile: File | null = null;
  uploadMessage: string | null = null;
  cloudinaryResponse: CloudinaryResponse | null = null;
  artirstInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  constructor() {
    super();
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.artirstInfor.id = this.tokenService.getUserId();
    this.artirstInfor.image_url = this.tokenService.getImageUrl();
  }

  ngOnInit(): void {
    this.getUserInfor();
  }

  uploadTrack() {
    if (this.selectedFile) {
      debugger;

      this.songService.uploadToCloudinary(this.selectedFile, this.token).subscribe({
        next: (apiResponse) => {
          debugger;
          if (apiResponse.status === "OK") {
            this.cloudinaryResponse = apiResponse.data as CloudinaryResponse
            debugger;
          }
        },
        complete: () => {
          this.navigateToAddMetaData();
        },
        error: (error) => {
          debugger;
          console.log(error);
        }
      });
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadTrack();
    }
  }

  navigateToAddMetaData() {
    this.router.navigate(['/artist/tracks/upload-track-meta-data'], { state: { cloudinaryResponse: this.cloudinaryResponse } });
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

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToAlbums() {
    this.router.navigate(['/artist/albums']);
  }

  navigateToProfile() {
    this.router.navigate(['/user/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}

