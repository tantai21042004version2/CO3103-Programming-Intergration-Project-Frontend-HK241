import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/models/song';
import { Artist } from 'src/app/models/artirst';
import { Album } from 'src/app/models/album';
import { Genre } from 'src/app/models/genre';
import { Comment } from 'src/app/models/comment';
import { convertResponseToSong } from 'src/app/utils/to.song';
import { convertResponseToArtist } from 'src/app/utils/to.artirst';
import { convertResponseToAlbum } from 'src/app/utils/to.album';
import { convertResponseToComment } from 'src/app/utils/to.comment';
import { Listener } from 'src/app/models/listener';
import { CommentDto } from 'src/app/dtos/comment.dto';
import { ApiResponse } from 'src/app/responses/api.response';
import { convertResponseToGenre } from 'src/app/utils/to.genre';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseComponent implements OnInit {
  song_id: number = 0;
  // detailSong: Song = {
  //   id: 16, name: 'Perfect', duration: 188.107755, secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704732/songs/fjwyvbj23xgfkexshmwm.mp3',
  //   description: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', release_date: '2024-10-30', artist_id: 28,
  //   image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg',
  //   album_id: 28, genre_id: 3, public_id: '', status: 'APPROVED', created_at: '2024-11-27 00:00:00', updated_at: '2024-12-03 17:22:03'
  // }
  detailSong: Song = { id: 0, name: '', duration: 0, secure_url: '', description: '', release_date: '', artist_id: 0, image_url: '', album_id: 0, genre_id: 0, public_id: '', status: '', created_at: '', updated_at: '' };
  // artist: Artist = {
  //   id: 22, username: 'shiki', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732705685/profileimages/e9qbilyb2kyhkuq8z166.jpg',
  //   artist_name: '', biography: ''
  // }
  artist: Artist = { id: 0, username: '', image_url: '', artist_name: '', biography: '' };
  // album: Album = {
  //   id: 28, name: 'LẶNG', artist_id: 22, release_date: '2024-10-30', cover_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732705685/profileimages/e9qbilyb2kyhkuq8z166.jpg',
  //   status: '', created_at: '', updated_at: '', description: '', genre_id: 3, deleted_at: ''
  // }
  album: Album = { id: 0, name: '', artist_id: 0, release_date: '', cover_url: '', status: '', created_at: '', updated_at: '', description: '', genre_id: 0, deleted_at: '' };
  // genre: Genre = { id: 3, name: 'Pop' }
  genres: Genre = { id: 0, name: '' };
  comments: Comment[] = [];
  // comments: Comment[] = [
  //   { id: 1, content: 'This is a comment', user: { id: 2, username: 'LISTENER', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732715652/profileimages/d2knrydxoapfvsbgmzxq.jpg', role: { id: 2, name: 'LISTENER' } } },
  //   { id: 2, content: 'This is a comment', user: { id: 2, username: 'LISTENER', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732715652/profileimages/d2knrydxoapfvsbgmzxq.jpg', role: { id: 2, name: 'LISTENER' } } },
  //   { id: 3, content: 'This is a comment', user: { id: 2, username: 'LISTENER', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732715652/profileimages/d2knrydxoapfvsbgmzxq.jpg', role: { id: 2, name: 'LISTENER' } } },
  //   { id: 2, content: 'This is a comment', user: { id: 2, username: 'LISTENER', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732715652/profileimages/d2knrydxoapfvsbgmzxq.jpg', role: { id: 2, name: 'LISTENER' } } },
  //   { id: 2, content: 'This is a comment', user: { id: 2, username: 'LISTENER', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732715652/profileimages/d2knrydxoapfvsbgmzxq.jpg', role: { id: 2, name: 'LISTENER' } } },
  //   { id: 2, content: 'This is a comment', user: { id: 2, username: 'LISTENER', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732715652/profileimages/d2knrydxoapfvsbgmzxq.jpg', role: { id: 2, name: 'LISTENER' } } },
  //   { id: 2, content: 'This is a comment', user: { id: 2, username: 'LISTENER', image_url: 'http://res.cloudinary.com/tantai21042004/image/upload/v1732715652/profileimages/d2knrydxoapfvsbgmzxq.jpg', role: { id: 2, name: 'LISTENER' } } },
  // ];
  listener: Listener = { id: 0, username: '', image_url: '' };
  // relatedSongs: Song[] = [
  //   {
  //     id: 1, name: 'Perfect', duration: 188.107755, secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704732/songs/fjwyvbj23xgfkexshmwm.mp3',
  //     description: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', release_date: '2024-10-30', artist_id: 28,
  //     image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg',
  //     album_id: 28, genre_id: 3, public_id: '', status: 'APPROVED', created_at: '2024-11-27 00:00:00', updated_at: '2024-12-03 17:22:03'
  //   },
  //   {
  //     id: 2, name: 'Perfect', duration: 188.107755, secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704732/songs/fjwyvbj23xgfkexshmwm.mp3',
  //     description: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', release_date: '2024-10-30', artist_id: 28,
  //     image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg',
  //     album_id: 28, genre_id: 3, public_id: '', status: 'APPROVED', created_at: '2024-11-27 00:00:00', updated_at: '2024-12-03 17:22:03'
  //   },
  //   {
  //     id: 1, name: 'Perfect', duration: 188.107755, secure_url: 'https://res.cloudinary.com/tantai21042004/video/upload/v1732704732/songs/fjwyvbj23xgfkexshmwm.mp3',
  //     description: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg', release_date: '2024-10-30', artist_id: 28,
  //     image_url: 'https://res.cloudinary.com/tantai21042004/image/upload/v1732880370/albums/nwdo0m9f6gxbxaaq2ido.jpg',
  //     album_id: 28, genre_id: 3, public_id: '', status: 'APPROVED', created_at: '2024-11-27 00:00:00', updated_at: '2024-12-03 17:22:03'
  //   }
  // ];
  relatedSongs: Song[] = [];
  isPlaying: boolean = false;
  duration: number = 0;
  currentTime: number = 0;
  volume: number = 0.5;


  comment: CommentDto = { content: '', song_id: 0 };

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    super();
  }

  // ngOnInit(): void {
  //   this.volume = 0.5;

  //   this.listener.image_url = this.tokenService.getImageUrl();
  //   this.listener.id = this.tokenService.getUserId();
  // }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.song_id = +params['id']; // Lấy id từ URL
      this.loadSongData(); // Gọi hàm tải dữ liệu bài hát
    });
    this.listener.image_url = this.tokenService.getImageUrl();
    this.listener.id = this.tokenService.getUserId();

  }

  async loadSongData(): Promise<void> {
    try {
      const [songDetailResponse, commentsResponse] = await Promise.all([
        this.songService.detail(this.song_id).toPromise(),
        this.commentService.getBySongId(this.song_id, { page: 1, limit: 10 }).toPromise(),
      ]);

      if (songDetailResponse && songDetailResponse.status === "OK") {
        const song = songDetailResponse.data;
        this.detailSong = convertResponseToSong(song);
        this.artist = convertResponseToArtist(song.artist);
        this.album = convertResponseToAlbum(song.album);
        this.genres = convertResponseToGenre(song.genre);

        this.updateAudioUrl(this.detailSong.secure_url, this.detailSong.duration);
      }

      if (commentsResponse && commentsResponse.status === "OK") {
        const comments = commentsResponse.data.comments;
        this.comments = comments.map((comment: any) => convertResponseToComment(comment));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    try {
      debugger;
      console.log(this.album.id);
      const response = await this.songService.getAllSong({ page: 1, limit: 3, keyword: '', album_id: this.album.id.toString() }).toPromise();
      if (response && response.status === "OK") {
        this.relatedSongs = response.data.songs;
        console.log(this.relatedSongs);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  updateAudioUrl(url: string, duration: number): void {
    this.duration = duration;
    this.cdr.detectChanges();
  }



  togglePlayPause(audio: HTMLAudioElement): void {
    if (!this.detailSong.secure_url) {
      console.error("Audio URL is empty!");
      return;
    }

    if (!this.isPlaying) {
      audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((error) => {
          console.error("Error during play:", error);
        });
    } else {
      audio.pause();
      this.isPlaying = false;
      console.log("Audio is paused!");
    }
  }

  onAudioReady(): void {
    console.log("Audio is ready to play!");
  }


  updateProgress(audio: HTMLAudioElement): void {
    this.currentTime = audio.currentTime;
    this.duration = audio.duration || 0;
  }

  seek(audio: HTMLAudioElement, event: Event): void {
    const target = event.target as HTMLInputElement;
    audio.currentTime = parseFloat(target.value);
  }

  setVolume(level: number): void {
    this.volume = level;
  }

  // changeVolume(audio: HTMLAudioElement, event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.volume = parseFloat(target.value);
  //   audio.volume = this.volume;
  //   console.log(`Volume set to: ${this.volume}`);
  // }
  changeVolumeOnDrag(event: MouseEvent): void {
    const volumeBar = event.currentTarget as HTMLElement;
    const rect = volumeBar.getBoundingClientRect();
    const clickPosition = rect.bottom - event.clientY;
    const barHeight = rect.height;

    // Calculate the volume (0 to 1)
    this.volume = Math.min(Math.max(clickPosition / barHeight, 0), 1);

    // Update audio volume
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (audio) {
      audio.volume = this.volume;
    }

    console.log(`Volume set to: ${this.volume}`);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  onEnded(audio: HTMLAudioElement): void {
    this.isPlaying = false;
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/song', id]);
  }

  createComment() {
    this.comment.song_id = this.song_id;
    if (this.comment.content.trim() === '') {
      return;
    }
    debugger;

    this.commentService.create(this.comment, this.tokenService.getToken()).subscribe((response: ApiResponse) => {
      if (response.status === "OK") {
        this.comments.push(convertResponseToComment(response.data));
        this.comment.content = '';
      }
    });
  }
}

