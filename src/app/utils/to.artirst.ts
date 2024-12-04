import { Artist } from "../models/artirst";

export function convertResponseToArtist(userResponse: any): Artist {
    const artist: Artist = { id: 0, username: '', image_url: '', artist_name: '', biography: '' }

    artist.id = userResponse.id;
    artist.username = userResponse.username;
    artist.image_url = userResponse.image_url;
    artist.artist_name = userResponse.artist_name;
    artist.biography = userResponse.biography;

    return artist;
}