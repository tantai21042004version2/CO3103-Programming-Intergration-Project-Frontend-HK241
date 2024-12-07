import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoleService } from "src/app/services/role.service";
import { TokenService } from "src/app/services/token.service";
import { UserService } from "src/app/services/user.service";
import { SongService } from "src/app/services/song.service";
import { CommentService } from "src/app/services/comment.service";
import { AlbumService } from "src/app/services/album.service";

export class BaseComponent {
    userService: UserService = inject(UserService);
    roleService: RoleService = inject(RoleService);
    tokenService: TokenService = inject(TokenService);
    songService: SongService = inject(SongService);
    commentService: CommentService = inject(CommentService);
    albumService: AlbumService = inject(AlbumService);

    router: Router = inject(Router);
}