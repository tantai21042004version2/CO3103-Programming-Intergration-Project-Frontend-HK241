import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-artirstoverview',
  templateUrl: './artirstoverview.component.html',
  styleUrls: ['./artirstoverview.component.scss']
})
export class ArtirstoverviewComponent extends BaseComponent {
  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
  }

  navigateToAlbums() {
    this.router.navigate(['/artist/albums']);
  }
}
