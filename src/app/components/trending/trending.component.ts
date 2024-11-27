import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { SongResponse } from 'src/app/responses/song.response';
import { ApiResponse } from 'src/app/responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent extends BaseComponent implements OnInit {
  tracks: SongResponse[] = [];

  ngOnInit(): void {
    debugger;
    this.songService.getAllSong({ page: 1, limit: 15, keyword: '' }).subscribe({
      next: (apiResponse: ApiResponse) => {
        debugger;
        this.tracks = apiResponse.data.songs;
      },
      error: (error: HttpErrorResponse) => {
        debugger;
        console.log(error);
      }
    });
  }

  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
