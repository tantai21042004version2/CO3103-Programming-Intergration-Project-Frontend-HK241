import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artirst-album-upload',
  templateUrl: './artirst-album-upload.component.html',
  styleUrls: ['./artirst-album-upload.component.scss']
})
export class ArtirstAlbumUploadComponent extends BaseComponent {
  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }
}
