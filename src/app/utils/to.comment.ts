import { Comment } from "../models/comment";
import { convertResponseToCommentUser } from "./to.comment.user";

export function convertResponseToComment(commentResponse: any): Comment {
    const comment: Comment = { id: 0, content: '', user: { id: 0, image_url: '', username: '', role: { id: 0, name: '' } } }

    comment.id = commentResponse.id;
    comment.content = commentResponse.content;
    comment.user = convertResponseToCommentUser(commentResponse.user);

    return comment;
}