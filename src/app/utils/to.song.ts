import { Song } from "../models/song";

export function convertResponseToSong(songResponse: any): Song {
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