import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Song } from 'src/app/models/song';
import { Artist } from 'src/app/models/artirst';
import { Album } from 'src/app/models/album';
import { Genre } from 'src/app/models/genre';
import { Comment } from 'src/app/models/comment';
import { CommentUserResponse } from 'src/app/responses/user/cmtuser.response';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseComponent implements OnInit {
  song_id: number = 0;
  detailSong: Song = { id: 0, name: '', duration: 0, secure_url: '', description: '', release_date: '', artist_id: 0, image_url: '', album_id: 0, genre_id: 0, public_id: '', status: '', created_at: '', updated_at: '' }
  artist: Artist = { id: 0, username: '', image_url: '', artist_name: '', biography: '' }
  album: Album = { id: 0, name: '', artist_id: 0, release_date: '', cover_url: '', status: '', created_at: '', updated_at: '', description: '', genre_id: 0, deleted_at: '' }
  genre: Genre = { id: 0, name: '' }
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute) {
    super();
  }

  getDetailSong(): void {
    this.songService.detail(this.song_id).subscribe({
      next: (apiResponse: ApiResponse) => {
        const song = apiResponse.data;
        this.detailSong = this.convertResponseToSong(song);
        this.artist = this.convertResponseToArtist(song.artist);
        this.album = this.convertResponseToAlbum(song.album);
        this.genre = this.convertResponseToGenre(song.genre);
      },
      complete: () => {
        // console.log(this.detailSong);
        // console.log(this.artist);
        // console.log(this.album);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
  }

  getComments(): void {
    this.commentService.getBySongId(this.song_id, { page: 1, limit: 10 }).subscribe({
      next: (apiResponse: ApiResponse) => {
        const comments = apiResponse.data.comments;
        this.comments = comments.map((comment: any) => this.convertResponseToComment(comment));
      },
      complete: () => {
        console.log(this.comments);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.song_id = Number(id);

    this.getDetailSong();
    this.getComments();
  }

  convertResponseToSong(songResponse: any): Song {
    const detailSong: Song = { id: 0, name: '', duration: 0, secure_url: '', description: '', release_date: '', artist_id: 0, image_url: '', album_id: 0, genre_id: 0, public_id: '', status: '', created_at: '', updated_at: '' }

    detailSong.id = songResponse.id;
    detailSong.name = songResponse.name;
    detailSong.artist_id = songResponse.artist.id;
    detailSong.duration = songResponse.duration;
    detailSong.image_url = songResponse.image_url;
    detailSong.secure_url = songResponse.secure_url;
    detailSong.public_id = songResponse.public_id;
    detailSong.genre_id = songResponse.genre.id;
    detailSong.status = songResponse.status;
    detailSong.description = songResponse.description;
    detailSong.release_date = songResponse.release_date;
    detailSong.created_at = songResponse.created_at;
    detailSong.updated_at = songResponse.updated_at;

    return detailSong;
  }

  convertResponseToArtist(userResponse: any): Artist {
    const artist: Artist = { id: 0, username: '', image_url: '', artist_name: '', biography: '' }

    artist.id = userResponse.id;
    artist.username = userResponse.username;
    artist.image_url = userResponse.image_url;
    artist.artist_name = userResponse.artist_name;
    artist.biography = userResponse.biography;

    return artist;
  }

  convertResponseToAlbum(albumResponse: any): Album {
    const album: Album = { id: 0, name: '', artist_id: 0, release_date: '', cover_url: '', status: '', created_at: '', updated_at: '', description: '', genre_id: 0, deleted_at: '' }

    album.id = albumResponse.id;
    album.name = albumResponse.name;
    album.artist_id = albumResponse.artist_id;
    album.release_date = albumResponse.release_date;
    album.cover_url = albumResponse.cover_url;
    album.status = albumResponse.status;
    album.created_at = albumResponse.created_at;
    album.updated_at = albumResponse.updated_at;
    album.description = albumResponse.description;
    album.genre_id = albumResponse.genre_id;
    album.deleted_at = albumResponse.deleted_at;

    return album;
  }

  convertResponseToGenre(genreResponse: any): Genre {
    const genre: Genre = { id: 0, name: '' }

    genre.id = genreResponse.id;
    genre.name = genreResponse.name;

    return genre;
  }

  convertResponseToCommentUser(commentUserResponse: any): CommentUserResponse {
    const commentUser: CommentUserResponse = { id: 0, image_url: '', username: '', role: { id: 0, name: '' } }

    commentUser.id = commentUserResponse.id;
    commentUser.image_url = commentUserResponse.image_url;
    commentUser.username = commentUserResponse.username;
    commentUser.role = this.convertResponseToRole(commentUserResponse.role);

    return commentUser;
  }

  convertResponseToComment(commentResponse: any): Comment {
    const comment: Comment = { id: 0, content: '', user_id: 0, user: this.convertResponseToCommentUser(commentResponse.user) }

    comment.id = commentResponse.id;
    comment.content = commentResponse.content;
    comment.user_id = commentResponse.user_id;

    return comment;
  }

  convertResponseToRole(roleResponse: any): Role {
    const role: Role = { id: 0, name: '' }

    role.id = roleResponse.id;
    role.name = roleResponse.name;

    return role;
  }
}
