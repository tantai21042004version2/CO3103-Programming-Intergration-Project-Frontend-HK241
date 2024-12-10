import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from 'src/app/models/artirst';
import { Song } from 'src/app/models/song';
import { UploadAlbumDto } from 'src/app/dtos/upload.album.dto';
import { NgForm } from '@angular/forms';
import { Genre } from 'src/app/models/genre';
import { ApiResponse } from 'src/app/responses/api.response';
import { UpdateAlbumSongDTO } from 'src/app/dtos/update.album.song.dto';

@Component({
  selector: 'app-artist-album-upload-detail',
  templateUrl: './artist-album-upload-detail.component.html',
  styleUrls: ['./artist-album-upload-detail.component.scss']
})
export class ArtistAlbumUploadDetailComponent extends BaseComponent implements OnInit {
  @ViewChild('uploadForm') uploadForm!: NgForm;

  artirstInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';

  artistTracks: Song[] = [];
  genres: Genre[] = [];
  albumId: number = 0;

  file: File | null = null;
  imageSrc: string | null = null;

  name: string;
  description: string;
  cover_url: string;
  release_date: string;
  genre_id: number;
  add_song_ids: number[];


  constructor() {
    super();
    this.name = '';
    this.description = '';
    this.cover_url = '';
    this.release_date = '';
    this.genre_id = 0;
    this.add_song_ids = [];
  }

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.artirstInfor.id = this.tokenService.getUserId();
    this.artirstInfor.image_url = this.tokenService.getImageUrl();
  }

  getArtistTracks() {
    this.songService.getArtistTracks(this.token).subscribe((res) => {
      if (res.status === 'OK') {
        this.artistTracks = res.data.songs;
      }
    });
  }

  getGenre() {
    this.genreService.getAllGenre().subscribe((res: ApiResponse) => {
      this.genres = res.data;
    });
  }

  ngOnInit(): void {
    this.getUserInfor();
    this.getArtistTracks();
    this.getGenre();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0]; // Lưu file vào biến
      const reader = new FileReader();

      reader.onload = () => {
        this.imageSrc = reader.result as string; // Cập nhật URL ảnh để hiển thị
      };

      reader.readAsDataURL(this.file); // Đọc file ảnh để hiển thị
      this.uploadFile();
    }
  }


  addSong(songId: number) {
    if (this.add_song_ids.includes(songId)) {
      // no add more
      return;
    } else {
      this.add_song_ids.push(songId);
    }
    console.log(this.add_song_ids);
  }


  async uploadFile() {
    if (this.file) {
      this.albumService.cloudinaryUpload(this.file, this.token).subscribe({
        next: (res: ApiResponse) => {
          if (res.status === 'OK') {
            this.cover_url = res.data.secure_url;
            console.log('Upload thành công:', res.data.secure_url);
          } else {
            console.error('Upload thất bại:', res.message);
          }
        },
        error: (err) => {
          console.error('Có lỗi xảy ra khi upload:', err);
        },
      });
    } else {
      console.error('No file selected.');
    }
  }


  uploadAlbum(): Promise<void> {
    const albumDto: UploadAlbumDto = {
      name: this.name,
      description: this.description,
      cover_url: this.cover_url,
      release_date: this.release_date,
      genre_id: this.genre_id,
    };

    return new Promise((resolve, reject) => {
      this.albumService.uploadAlbum(this.token, albumDto).subscribe({
        next: (res) => {
          if (res.status === 'OK') {
            debugger;
            this.albumId = res.data.id;
            resolve();
          } else {
            reject(new Error(res.message)); // Lỗi từ server
          }
        },
        error: (err) => reject(err), // Lỗi mạng hoặc hệ thống
      });
    });
  }

  uploadAlbumDetail(): Promise<void> {
    const albumDetailDto: UpdateAlbumSongDTO = {
      add_song_ids: this.add_song_ids,
      remove_song_ids: [],
    };

    return new Promise((resolve, reject) => {
      this.albumService.uploadAlbumDetail(this.token, albumDetailDto, this.albumId).subscribe({
        next: (res) => {
          if (res.status === 'OK') {
            console.log(res.message);
            resolve(); // Hoàn thành
          } else {
            reject(new Error(res.message)); // Lỗi từ server
          }
        },
        error: (err) => reject(err), // Lỗi mạng hoặc hệ thống
      });
    });
  }

  sendToApprove() {
    this.albumService.sendToApprove(this.token, this.albumId).subscribe((res: ApiResponse) => {
      if (res.status === 'OK') {
        alert('Send to approve successfully');
      }
    });
  }

  async uploadAll() {
    try {
      console.log('Bắt đầu upload album...');
      await this.uploadAlbum();
      console.log('Upload album thành công, bắt đầu upload chi tiết...');
      await this.uploadAlbumDetail();
      console.log('Upload chi tiết album thành công!');
    } catch (error) {
      console.error('Có lỗi xảy ra khi upload:', error);
    }
    alert('Upload album thành công!');
    this.router.navigate(['/artist/albums']);
  }


  navigateToProfile() {
    this.router.navigate(['/artist/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/signin']);
  }

  removeSong(songId: number) {
    this.add_song_ids = this.add_song_ids.filter((id) => id !== songId);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }

  navigateToOverview() {
    this.router.navigate(['/artist/overview']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToAlbums() {
    this.router.navigate(['/artist/albums']);
  }
}
