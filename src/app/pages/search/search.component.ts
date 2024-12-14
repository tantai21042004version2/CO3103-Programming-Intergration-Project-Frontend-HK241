import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Mảng dữ liệu cho các mục
  menuItems = [
    { label: 'Everything', icon: '../../../assets/search-icon.png' },
    { label: 'Tracks', icon: '../../../assets/track-icon.png' },
    { label: 'People', icon: '../../../assets/people-icon.png' },
    { label: 'Albums', icon: '../../../assets/album-icon.png' },
    { label: 'Playlists', icon: '../../../assets/playlist.png' },
  ];

  // Chỉ số của mục đang được chọn
  selectedIndex: number = 0;

  // Hàm chọn mục
  selectItem(index: number) {
    this.selectedIndex = index; // Cập nhật chỉ số mục được chọn
  }
}
