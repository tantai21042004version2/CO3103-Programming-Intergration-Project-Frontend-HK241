import { SongResponse } from "./song.response";

export interface SongListResponse {
    songs: SongResponse[];
    current_page: number;
    total_pages: number;
    items_per_page: number;
}   