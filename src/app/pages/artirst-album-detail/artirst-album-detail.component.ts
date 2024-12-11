import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album';
import { ApiResponse } from 'src/app/responses/api.response';
import { Artist } from 'src/app/models/artirst';
import { TokenService } from 'src/app/services/token.service';
import { Song } from 'src/app/models/song';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Comment } from 'src/app/models/comment';
import { convertResponseToComment } from 'src/app/utils/to.comment';

@Component({
  selector: 'app-artirst-album-detail',
  templateUrl: './artirst-album-detail.component.html',
  styleUrls: ['./artirst-album-detail.component.scss']
})
export class ArtirstAlbumDetailComponent extends BaseComponent implements OnInit {
  artirstInfor: Artist = {
    id: 0,
    username: '',
    image_url: '',
    artist_name: '',
    biography: '',
  };
  token: string = '';
  albumId: number;

  album: Album = {
    id: 0,
    name: '',
    description: '',
    release_date: '',
    status: '',
    genre_id: 0,
    created_at: '',
    updated_at: '',
    deleted_at: '',
    artist_id: 0,
    cover_url: '',
  };
  songs: Song[] = [];
  comments: Comment[] = [];

  getUserInfor() {
    this.token = this.tokenService.getToken();
    this.artirstInfor.id = this.tokenService.getUserId();
    this.artirstInfor.image_url = this.tokenService.getImageUrl();
  }

  constructor(private route: ActivatedRoute) {
    super();
    this.albumId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getUserInfor();
    this.getAlbumDetail().pipe(
      switchMap(() => this.getComments())
    ).subscribe({
      next: () => console.log('Album details and comments loaded'),
      error: (error) => console.log(error)
    });
  }

  getAlbumDetail() {
    return this.albumService.getAlbumDetail(this.token, this.albumId).pipe(
      tap((res: ApiResponse) => {
        this.album = res.data;
        this.album.cover_url = res.data.cover_image_url;
        this.songs = res.data.songs;
      })
    );
  }

  getComments() {
    if (this.songs.length === 0) {
      return forkJoin([]);
    }
    return forkJoin(
      this.songs.map(song =>
        this.commentService.getBySongId(song.id, { page: 1, limit: 10 }).pipe(
          tap((res: ApiResponse) => {
            this.comments = this.comments.concat(res.data.comments.map((comment: any) => convertResponseToComment(comment)));
          })
        )
      )
    );
  }

  navigateToProfile() {
    this.router.navigate(['/user/profile']);
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }


  navigateToDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  navigateToUserList() {
    this.router.navigate(['/admin/user-list']);
  }

  goToDetail(id: number) {
    this.router.navigate(['/song', id]);
  }

  navigateToApprovedTracks() {
    this.router.navigate(['/admin/songs/approved']);
  }

  navigateToPendingTracks() {
    this.router.navigate(['/admin/songs/pending']);
  }

  navigateToApprovedAlbums() {
    this.router.navigate(['/admin/albums/approved']);
  }

  navigateToPendingAlbums() {
    this.router.navigate(['/admin/albums/pending']);
  }

  navigateToAddMusic() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToNewTrack() {
    this.router.navigate(['/artist/tracks/upload-track-cloudinary']);
  }

  navigateToTracks() {
    this.router.navigate(['/artist/tracks']);
  }
}
