import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from '../../models/artirst';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-artirst-tracks',
  templateUrl: './artirst-tracks.component.html',
  styleUrls: ['./artirst-tracks.component.scss']
})
export class ArtirstTracksComponent extends BaseComponent implements OnInit {
  artirstInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  tracks: Song[] = [
    {
      id: 12, name: 'Anh Vẫn Đợi', secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704551/songs/zdhim46gztezz7j5zsyb.mp3', image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', status: 'APPROVED',
      artist_id: 0,
      album_id: 0,
      duration: 0,
      public_id: '',
      genre_id: 0,
      description: '',
      release_date: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: 12, name: 'Anh Vẫn Đợi', secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704551/songs/zdhim46gztezz7j5zsyb.mp3', image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', status: 'APPROVED',
      artist_id: 0,
      album_id: 0,
      duration: 0,
      public_id: '',
      genre_id: 0,
      description: '',
      release_date: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: 12, name: 'Anh Vẫn Đợi', secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704551/songs/zdhim46gztezz7j5zsyb.mp3', image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', status: 'APPROVED',
      artist_id: 0,
      album_id: 0,
      duration: 0,
      public_id: '',
      genre_id: 0,
      description: '',
      release_date: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: 12, name: 'Anh Vẫn Đợi', secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704551/songs/zdhim46gztezz7j5zsyb.mp3', image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', status: 'APPROVED',
      artist_id: 0,
      album_id: 0,
      duration: 0,
      public_id: '',
      genre_id: 0,
      description: '',
      release_date: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: 12, name: 'Anh Vẫn Đợi', secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704551/songs/zdhim46gztezz7j5zsyb.mp3', image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', status: 'APPROVED',
      artist_id: 0,
      album_id: 0,
      duration: 0,
      public_id: '',
      genre_id: 0,
      description: '',
      release_date: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: 12, name: 'Anh Vẫn Đợi', secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704551/songs/zdhim46gztezz7j5zsyb.mp3', image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', status: 'APPROVED',
      artist_id: 0,
      album_id: 0,
      duration: 0,
      public_id: '',
      genre_id: 0,
      description: '',
      release_date: '',
      created_at: '',
      updated_at: ''
    },
  ];

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.artirstInfor.id = this.tokenService.getUserId();
    this.artirstInfor.image_url = this.tokenService.getImageUrl();
  }

  getArtistTracks() {
    // this.songService.getArtistTracks(this.token).subscribe({
    //   next: (apiResponse) => {
    //     if (apiResponse.status === "OK") {
    //       this.tracks = apiResponse.data.songs;
    //       debugger;
    //     }
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }

  ngOnInit(): void {
    this.getUserInfor();
    this.getArtistTracks();
  }

  navigateToAddMusic() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  showConfirmModal = false;
  confirmMessage = '';
  selectedTrack: any = null;
  actionType: string = '';
  notificationMessage: string | null = null;
  isSuccess: boolean = true;

  openConfirmModal(action: string, track: any) {
    this.actionType = action;
    this.selectedTrack = track;
    this.confirmMessage =
      action === 'approve'
        ? `Are you sure you want to send "${track.name}" for approval?`
        : `Are you sure you want to delete "${track.name}"?`;
    this.showConfirmModal = true;
  }


  closeConfirmModal() {
    this.showConfirmModal = false;
    this.confirmMessage = '';
    this.selectedTrack = null;
    this.actionType = '';
  }

  confirmAction() {
    if (this.actionType === 'approve') {
      if (this.selectedTrack.status !== 'DRAFT') {
        if (this.selectedTrack.status === 'PENDING') {
          this.showNotification('Track is already submitted for approval', false);
        }
        else if (this.selectedTrack.status === 'APPROVED') {
          this.showNotification('Track is already approved', false);
        }
      } else {
        this.songService.submitSong(this.selectedTrack.id, this.token).subscribe({
          next: (apiResponse) => {
            if (apiResponse.status === 'OK') {
              this.showNotification('Track submitted for approval', true);
            }
          },
          error: (error) => {
            this.showNotification('Failed to submit track', false);
          }
        });
      }
    } else if (this.actionType === 'delete') {
      this.songService.deleteSong(this.selectedTrack.id, this.token).subscribe({
        next: (apiResponse) => {
          if (apiResponse.status === 'OK') {
            this.showNotification('Track deleted', true);
          }
        },
        error: (error) => {
          this.showNotification('Failed to delete track', false);
        }
      });
    }
    this.closeConfirmModal();
  }

  cancelAction() {
    this.closeConfirmModal();
  }

  showNotification(message: string, success: boolean) {
    this.notificationMessage = message;
    this.isSuccess = success;
    setTimeout(() => {
      this.notificationMessage = null;
    }, 5000);
  }
}
