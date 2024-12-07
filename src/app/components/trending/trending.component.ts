import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/base/base.component';
import { ApiResponse } from 'src/app/responses/api.response';
import { SongResponse } from 'src/app/responses/song/song.response';
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
    this.songService.getAllSong({ page: 1, limit: 15, keyword: '', album_id: '' }).subscribe({
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

  navigateToDetail(id: number) {
    this.router.navigate(['/song', id]);
  }
}
// import { Component, OnInit } from '@angular/core';
// import { SongResponse } from 'src/app/responses/song/song.response';

// @Component({
//   selector: 'app-trending',
//   templateUrl: './trending.component.html',
//   styleUrls: ['./trending.component.scss'],
// })
// export class TrendingComponent implements OnInit {
//   tracks: SongResponse[] = []; // Dữ liệu bài hát
//   isExpanded: boolean = false;

//   ngOnInit(): void {
//     // Gán tạm dữ liệu vào tracks
//     this.tracks = [
//       {
//         id: 4,
//         artist: "Jack",
//         name: "Đừng Làm Trái Tim Anh Đau",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732701512/songs/pwz9za8e0nzzo2lq0jww.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 5,
//         artist: "Jack",
//         name: "Chạy Ngay Đi",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732702300/songs/xd4ldiyutxnyrdfutgkl.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 6,
//         artist: "Jack",
//         name: "Chúng Ta Của Hiện Tại",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732702734/songs/mkkjgg8r2qsuggoqqxu4.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 7,
//         artist: "Jack",
//         name: "Hãy Trao Cho Anh",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732702941/songs/bdsof3qdycwgi3tmhq2x.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 8,
//         artist: "Jack",
//         name: "Em Của Ngày Hôm Qua",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732703301/songs/epv09d5ck3wxgv0o2k0z.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 4,
//         artist: "Jack",
//         name: "Đừng Làm Trái Tim Anh Đau",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732701512/songs/pwz9za8e0nzzo2lq0jww.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 5,
//         artist: "Jack",
//         name: "Chạy Ngay Đi",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732702300/songs/xd4ldiyutxnyrdfutgkl.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 6,
//         artist: "Jack",
//         name: "Chúng Ta Của Hiện Tại",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732702734/songs/mkkjgg8r2qsuggoqqxu4.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 7,
//         artist: "Jack",
//         name: "Hãy Trao Cho Anh",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732702941/songs/bdsof3qdycwgi3tmhq2x.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 8,
//         artist: "Jack",
//         name: "Em Của Ngày Hôm Qua",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732703301/songs/epv09d5ck3wxgv0o2k0z.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 7,
//         artist: "Jack",
//         name: "Hãy Trao Cho Anh",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732702941/songs/bdsof3qdycwgi3tmhq2x.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       {
//         id: 8,
//         artist: "Jack",
//         name: "Em Của Ngày Hôm Qua",
//         secure_url:
//           "https://res.cloudinary.com/tantai21042004/video/upload/v1732703301/songs/epv09d5ck3wxgv0o2k0z.mp3",
//         image_url:
//           "http://res.cloudinary.com/tantai21042004/image/upload/v1732700860/profileimages/gyngaasq2tlqkashgppe.jpg",
//         status: "APPROVED",
//       },
//       // Thêm các bài hát khác nếu cần
//     ];
//   }

//   // ngOnInit(): void {
//   //     debugger;
//   //     this.songService.getAllSong({ page: 1, limit: 15, keyword: '' }).subscribe({
//   //       next: (apiResponse: ApiResponse) => {
//   //         debugger;
//   //         this.tracks = apiResponse.data.songs;
//   //       },
//   //       error: (error: HttpErrorResponse) => {
//   //         debugger;
//   //         console.log(error);
//   //       }
//   //     });
//   //   }


//   toggleExpand() {
//     this.isExpanded = !this.isExpanded;
//   }
// }