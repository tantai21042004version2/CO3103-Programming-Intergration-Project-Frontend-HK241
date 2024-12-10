import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpUtilService } from "./http.util.service";
import { environment } from "src/environments/environments";
import { Observable } from "rxjs";
import { ApiResponse } from "../responses/api.response";
import { UploadSongDTO } from "../dtos/upload.song.dto";

@Injectable({
    providedIn: 'root'
})
export class SongService {
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);
    private apiConfig = {
        headers: this.httpUtilService.createHeaders(),
    }

    private apiGetAllSong = `${environment.apiBaseUrl}/songs`;
    private apiGetArtistTracks = `${environment.apiBaseUrl}/songs/artist`;
    private apiDetailSong = `${environment.apiBaseUrl}/songs/detail`;
    private apiUploadToCloudinary = `${environment.apiBaseUrl}/songs/cloudinary`;
    private apiCreateSong = `${environment.apiBaseUrl}/songs`;
    private apiSubmitSong = `${environment.apiBaseUrl}/songs/submit`;
    private apiApproveSong = `${environment.apiBaseUrl}/songs/approve`;
    private apiRejectSong = `${environment.apiBaseUrl}/songs/reject`;
    private apiGetPendingTracks = `${environment.apiBaseUrl}/songs/pending`;

    getAllSong(params: { page: number, limit: number, keyword: string, album_id: string })
        : Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            this.apiGetAllSong,
            { params: params }
        );
    }

    getArtistTracks(token: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiGetArtistTracks,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
            }
        );
    }

    getPendingTracks(token: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiGetPendingTracks,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
            }
        );
    }

    detail(id: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiDetailSong}/${id}`);
    }

    uploadToCloudinary(file: File, token: string): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<ApiResponse>(
            this.apiUploadToCloudinary,
            formData,
            {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
            }
        );
    }

    createSong(uploadSongDTO: UploadSongDTO, token: string): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiCreateSong, uploadSongDTO, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        });
    }

    submitSong(id: number, token: string): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(`${this.apiSubmitSong}/${id}`, {}, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        });
    }

    approveSong(id: number, token: string): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(`${this.apiApproveSong}/${id}`, {}, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        });
    }

    rejectSong(id: number, token: string): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(`${this.apiRejectSong}/${id}`, {}, {
            headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
        });
    }
}

