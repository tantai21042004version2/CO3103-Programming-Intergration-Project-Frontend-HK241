import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Artist } from 'src/app/models/artirst';
import { CloudinaryResponse } from 'src/app/responses/song/cloudinary';
import { Genre } from 'src/app/models/genre';
import { ApiResponse } from 'src/app/responses/api.response';
import { NgForm, Validators } from '@angular/forms';
import { UploadSongDTO } from 'src/app/dtos/upload.song.dto';

@Component({
  selector: 'app-artirst-upload-track-meta-data',
  templateUrl: './artirst-upload-track-meta-data.component.html',
  styleUrls: ['./artirst-upload-track-meta-data.component.scss']
})
export class ArtirstUploadTrackMetaDataComponent extends BaseComponent implements OnInit {
  @ViewChild('uploadForm') uploadForm!: NgForm;

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
  genres: Genre[] = [];

  name: string;
  description: string;
  release_date: string;
  genre_id: number;

  constructor() {
    super();
    this.name = '';
    this.description = '';
    this.release_date = '';
    this.genre_id = 0;

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


  covnertToDTO(): UploadSongDTO {
    const uploadSongDTO: UploadSongDTO = {
      name: this.name,
      description: this.description,
      release_date: this.release_date,
      genre_id: this.genre_id,
      secure_url: String(this.cloudinaryResponse?.secure_url),
      public_id: String(this.cloudinaryResponse?.public_id),
      duration: Number(this.cloudinaryResponse?.duration)
    }

    return uploadSongDTO;
  }

  getGenre() {
    this.genreService.getAllGenre().subscribe((res: ApiResponse) => {
      this.genres = res.data;
    });
  }

  ngOnInit(): void {
    this.getUserInfor();
    this.getGenre();
  }

  upload() {
    const uploadSongDTO = this.covnertToDTO();
    console.log("uploadSongDTO: ", uploadSongDTO);

    debugger;
    this.songService.createSong(uploadSongDTO, this.token).subscribe((res: ApiResponse) => {
      if (res.status === "OK") {
        this.alert(res.message);
      }
    });
  }

  alert(message: string) {
    setTimeout(() => {
      alert(message);
      this.router.navigate(['/artist/tracks']);
    }, 2000);
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
