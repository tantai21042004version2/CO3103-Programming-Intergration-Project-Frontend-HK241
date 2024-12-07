import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';
import { Artist } from 'src/app/models/artirst';
import { CloudinaryResponse } from 'src/app/responses/song/cloudinary';

@Component({
  selector: 'app-artirst-upload-track-meta-data',
  templateUrl: './artirst-upload-track-meta-data.component.html',
  styleUrls: ['./artirst-upload-track-meta-data.component.scss']
})
export class ArtirstUploadTrackMetaDataComponent extends BaseComponent implements OnInit {
  cloudinaryResponse: CloudinaryResponse | null = null;
  message: string = '';
  artirstInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: ''
  };
  token: string = '';

  constructor() {
    super();
    this.cloudinaryResponse = this.router.getCurrentNavigation()?.extras['state']?.['cloudinaryResponse'] as CloudinaryResponse | null;
    if (this.cloudinaryResponse) {
      this.message = 'Your track is uploaded to cloudinary, please fill in the following information to continue.';
    } else {
      this.message = 'Something went wrong, please try again.';
    }
    debugger;
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.artirstInfor.id = this.tokenService.getUserId();
    this.artirstInfor.image_url = this.tokenService.getImageUrl();
  }

  ngOnInit(): void {
    this.getUserInfor();
  }

  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
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
}
