import { Genre } from "../models/genre";

export function convertResponseToGenre(genreResponse: any): Genre {
    const genre: Genre = { id: 0, name: '' }

    genre.id = genreResponse.id;
    genre.name = genreResponse.name;

    return genre;
}