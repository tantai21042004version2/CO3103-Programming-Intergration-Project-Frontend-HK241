import { Comment } from "../models/comment";
import { convertResponseToCommentUser } from "./to.comment.user";

export function convertResponseToComment(commentResponse: any): Comment {
    const comment: Comment = { id: 0, content: '', user: convertResponseToCommentUser(commentResponse.user) }

    comment.id = commentResponse.id;
    comment.content = commentResponse.content;

    return comment;
}