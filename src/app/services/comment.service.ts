import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { ApiResponse } from "../responses/api.response";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpUtilService } from "./http.util.service";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);
    private apiConfig = {
        headers: this.httpUtilService.createHeaders(),
    }

    private apiGetBySongId = `${environment.apiBaseUrl}/comments/list`;
    getBySongId(songId: number, params: { page: number, limit: number }): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.apiGetBySongId}/${songId}`, { params: params });
    }
}

