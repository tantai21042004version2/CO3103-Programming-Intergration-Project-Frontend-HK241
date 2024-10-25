import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoleService } from "src/app/services/role.service";
import { TokenService } from "src/app/services/token.service";
import { UserService } from "src/app/services/user.service";

export class BaseComponent {
    userService: UserService = inject(UserService);
    roleService: RoleService = inject(RoleService);
    tokenService: TokenService = inject(TokenService);

    router: Router = inject(Router);
}