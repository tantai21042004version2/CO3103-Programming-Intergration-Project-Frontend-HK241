import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Album } from 'src/app/models/album';
import { ApiResponse } from 'src/app/responses/api.response';
import { Artist } from 'src/app/models/artirst';

@Component({
  selector: 'app-artirst-albums',
  templateUrl: './artirst-albums.component.html',
  styleUrls: ['./artirst-albums.component.scss']
})
export class ArtirstAlbumsComponent extends BaseComponent {
  artirstInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.artirstInfor.id = this.tokenService.getUserId();
    this.artirstInfor.image_url = this.tokenService.getImageUrl();
  }

  albums: Album[] = [];

  ngOnInit() {
    this.getUserInfor();
    this.getAlbums();
    debugger;
  }

  getAlbums() {
    this.albumService.getMyAlbums(this.token, { page: 1, limit: 10, keyword: '', status: '' }).subscribe(
      (res: ApiResponse) => {
        if (res.status === 'OK') {
          this.albums = res.data.albums;
          this.albums.forEach(album => {
            album.cover_url = res.data.cover_image_url;
          });
        }
      });
  }

  sendToApprove(albumId: number) {
    this.albumService.sendToApprove(this.token, albumId).subscribe((res: ApiResponse) => {
      if (res.status === 'OK') {
        alert('Send to approve successfully');
      }
    });
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

  navigateToAlbumUpload() {
    this.router.navigate(['/artist/album-upload-detail']);
  }

  navigateToProfile() {
    this.router.navigate(['/user/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
} 