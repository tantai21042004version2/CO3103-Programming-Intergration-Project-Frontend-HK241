import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artist-album-upload-detail',
  templateUrl: './artist-album-upload-detail.component.html',
  styleUrls: ['./artist-album-upload-detail.component.scss']
})
export class ArtistAlbumUploadDetailComponent extends BaseComponent {
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
