import { Album } from "../models/album";

export function convertResponseToAlbum(albumResponse: any): Album {
    const album: Album = { id: 0, name: '', artist_id: 0, release_date: '', cover_url: '', status: '', created_at: '', updated_at: '', description: '', genre_id: 0, deleted_at: '' }

    album.id = albumResponse.id;
    album.name = albumResponse.name;
    album.artist_id = albumResponse.artist_id;
    album.release_date = albumResponse.release_date;
    album.cover_url = albumResponse.cover_image_url;
    album.status = albumResponse.status;
    album.created_at = albumResponse.created_at;
    album.updated_at = albumResponse.updated_at;
    album.description = albumResponse.description;
    album.genre_id = albumResponse.genre_id;
    album.deleted_at = albumResponse.deleted_at;

    return album;
}