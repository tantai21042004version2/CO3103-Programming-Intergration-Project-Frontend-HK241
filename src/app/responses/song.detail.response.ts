import { ArtistResponse } from "./artirst.response";

export interface SongDetailResponse {
    id: number;
    name: string;
    duration: number;
    secure_url: string;
    description: string;
    artist: ArtistResponse;
    release_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}