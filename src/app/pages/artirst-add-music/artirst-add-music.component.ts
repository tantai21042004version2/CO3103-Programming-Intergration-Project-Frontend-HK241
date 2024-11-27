import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { UploadSongDTO } from '../../dtos/upload.song.dto';
import { ApiResponse } from 'src/app/responses/api.response';
import { SongDetailResponse } from 'src/app/responses/song.detail.response';

@Component({
  selector: 'app-artirst-add-music',
  templateUrl: './artirst-add-music.component.html',
  styleUrls: ['./artirst-add-music.component.scss']
})
export class ArtirstAddMusicComponent extends BaseComponent {
  formData = {
    name: '',
    description: '',
    release_date: '',
    musicFile: null as File | null
  };

  uploadSongDTO: UploadSongDTO = {
    title: '',
    description: '',
    release_date: '',
    secure_url: '',
    public_id: '',
    duration: 0
  };

  songDetailResponse: SongDetailResponse = {
    id: 0,
    name: '',
    duration: 0,
    secure_url: '',
    description: '',
    release_date: '',
    artist: {
      id: 0,
      username: '',
      image_url: ''
    },
    status: '',
    created_at: '',
    updated_at: ''
  };

  handleFileUpload(): void {
    const input = document.getElementById('musicFile') as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Kiểm tra MIME type của file
      const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/ogg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a music file (MP3, WAV, OGG).');
        this.formData.musicFile = null; // Reset file nếu không hợp lệ
        input.value = ''; // Reset input file
        return;
      }

      // Nếu file hợp lệ
      this.formData.musicFile = file;
      console.log('Valid file selected:', file.name);
    }

    if (this.formData.musicFile) {
      this.songService.uploadToCloudinary(
        this.formData.musicFile,
        this.tokenService.getToken()
      ).subscribe({
        next: (apiResponse: ApiResponse) => {
          debugger;
          this.uploadSongDTO.secure_url = apiResponse.data.secure_url;
          this.uploadSongDTO.public_id = apiResponse.data.public_id;
          this.uploadSongDTO.duration = apiResponse.data.duration;
        },
        complete: () => {
          debugger;
          this.submitForm();
        },
        error: (err) => {
          debugger;
        }
      });
    }
  }

  submitForm(): void {
    this.handleFileUpload();
    this.uploadSongDTO.title = this.formData.name;
    this.uploadSongDTO.description = this.formData.description;
    this.uploadSongDTO.release_date = this.formData.release_date;

    this.songService.createSong(this.uploadSongDTO, this.tokenService.getToken()).subscribe({
      next: (apiResponse: ApiResponse) => {
        this.songDetailResponse = apiResponse.data;
        console.log(this.songDetailResponse);
        debugger;
      },
      complete: () => {
        debugger;
        alert('Track uploaded successfully!');
      },
      error: (err) => {
        debugger;
      }
    });
  }
}
