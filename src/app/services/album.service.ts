import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpUtilService } from "./http.util.service";
import { environment } from "src/environments/environments";
import { ApiResponse } from "../responses/api.response";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);
    private apiConfig = {
        headers: this.httpUtilService.createHeaders(),
    }

    apiGetAllAlbum = `${environment.apiBaseUrl}/albums/list`;
    apiPendingAlbum = `${environment.apiBaseUrl}/albums/pending`;
    apiDeleteAlbum = `${environment.apiBaseUrl}/albums`;
    apiApproveAlbum = `${environment.apiBaseUrl}/albums`;

    getAllAlbum(params: { page: number, limit: number, keyword: string, status: string }): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiGetAllAlbum, { params: params, ...this.apiConfig });
    }

    getAllPendingAlbum(params: { page: number, limit: number, keyword: string }, token: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiPendingAlbum, {
            params: params,
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        });
    }

    approveAlbum(album_id: number, token: string, body: any): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(`${this.apiApproveAlbum}/${album_id}`, body, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        });
    }

    deleteAlbum(id: number, token: string): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiDeleteAlbum}/${id}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        });
    }
}

