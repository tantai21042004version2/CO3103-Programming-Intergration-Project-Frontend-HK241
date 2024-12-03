import { AlbumResponse } from "../album/album.response";
import { GenreResponse } from "../role_and_genre/genre.response";
import { ArtistResponse } from "../user/artirst.response";

export interface SongDetailResponse {
    id: number;

    name: string;

    duration: number;

    secure_url: string;

    image_url: string;

    album: AlbumResponse;

    genre: GenreResponse;

    description: string;

    artist: ArtistResponse;

    release_date: string;

    status: string;

    created_at: string;

    updated_at: string;
}