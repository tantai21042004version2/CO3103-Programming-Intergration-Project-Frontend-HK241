import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { HttpUtilService } from "./http.util.service";
import { ApiResponse } from "../responses/api.response";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenreService {
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);
    private apiConfig = {
        headers: this.httpUtilService.createHeaders(),
    }

    private apiGetAllGenre = `${environment.apiBaseUrl}/genres/list`;
    getAllGenre(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiGetAllGenre, this.apiConfig);
    }
}