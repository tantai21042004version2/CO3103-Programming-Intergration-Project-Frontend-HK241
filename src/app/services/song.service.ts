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
    getAllSong(params: { page: number, limit: number, keyword: string })
        : Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            this.apiGetAllSong,
            { params: params }
        );
    }

    private apiUploadToCloudinary = `${environment.apiBaseUrl}/songs/cloudinary`;
    uploadToCloudinary(file: File, token: string): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            this.apiUploadToCloudinary,
            file,
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                })
            }
        );
    }

    private apiCreateSong = `${environment.apiBaseUrl}/songs`;
    createSong(uploadSongDTO: UploadSongDTO, token: string): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiCreateSong, uploadSongDTO, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        });
    }
}

