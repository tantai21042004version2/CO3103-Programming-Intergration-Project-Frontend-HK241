import { CommentUserResponse } from "../responses/user/cmtuser.response";
import { convertResponseToRole } from "./to.role";

export function convertResponseToCommentUser(commentUserResponse: any): CommentUserResponse {
    const commentUser: CommentUserResponse = { id: 0, image_url: '', username: '', role: { id: 0, name: '' } }

    commentUser.id = commentUserResponse.id;
    commentUser.image_url = commentUserResponse.image_url;
    commentUser.username = commentUserResponse.username;
    commentUser.role = convertResponseToRole(commentUserResponse.role);

    return commentUser;
}