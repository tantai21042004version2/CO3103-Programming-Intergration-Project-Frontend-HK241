import { Role } from "src/app/models/role";
import { UserResponse } from "./user.response";

export interface CommentUserResponse {
    id: number;

    image_url: string;

    username: string;

    role: Role;
}   