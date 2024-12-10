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
    apiCloudinaryUpload = `${environment.apiBaseUrl}/albums/cloudinary`;
    apiUploadAlbum = `${environment.apiBaseUrl}/albums`;

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

    getMyAlbums(token: string, params: { page: number, limit: number, keyword: string, status: string }): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${environment.apiBaseUrl}/albums/me`, {
            params: params,
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        });
    }

    getAlbumDetail(token: string, album_id: number): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${environment.apiBaseUrl}/albums/detail/${album_id}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        });
    }

    cloudinaryUpload(file: File, token: string): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<ApiResponse>(this.apiCloudinaryUpload, formData, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
            })
        });
    }

    uploadAlbum(token: string, body: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiUploadAlbum, body, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        });
    }

    uploadAlbumDetail(token: string, body: any, album_id: number): Observable<ApiResponse> {
        const url = `${environment.apiBaseUrl}/albums/${album_id}/songs`;
        return this.http.patch<ApiResponse>(url, body, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        });
    }

    sendToApprove(token: string, album_id: number): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(`${environment.apiBaseUrl}/albums/${album_id}/submit`, {}, {
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

