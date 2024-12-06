import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artirst-album-detail',
  templateUrl: './artirst-album-detail.component.html',
  styleUrls: ['./artirst-album-detail.component.scss']
})
export class ArtirstAlbumDetailComponent extends BaseComponent {
  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }
}
