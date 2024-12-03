import { CommentUserResponse } from "../responses/user/cmtuser.response";

export interface Comment {
    id: number;

    content: string;

    user_id: number;

    user: CommentUserResponse;
}