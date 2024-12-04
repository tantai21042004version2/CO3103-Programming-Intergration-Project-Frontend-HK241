// import { Role } from "../models/role";
// import { Song } from "../models/song";
// import { CommentUserResponse } from "../responses/user/cmtuser.response";
// import { Album } from "../models/album";
// import { Genre } from "../models/genre";
// import { Comment } from "../models/comment";
// import { Artist } from "../models/artirst";

// export function convertResponseToRole(roleResponse: any): Role {
//     const role: Role = { id: 0, name: '' }

//     role.id = roleResponse.id;
//     role.name = roleResponse.name;

//     return role;
// }

// export function convertResponseToArtist(userResponse: any): Artist {
//     const artist: Artist = { id: 0, username: '', image_url: '', artist_name: '', biography: '' }

//     artist.id = userResponse.id;
//     artist.username = userResponse.username;
//     artist.image_url = userResponse.image_url;
//     artist.artist_name = userResponse.artist_name;
//     artist.biography = userResponse.biography;

//     return artist;
// }

// export function convertResponseToAlbum(albumResponse: any): Album {
//     const album: Album = { id: 0, name: '', artist_id: 0, release_date: '', cover_url: '', status: '', created_at: '', updated_at: '', description: '', genre_id: 0, deleted_at: '' }

//     album.id = albumResponse.id;
//     album.name = albumResponse.name;
//     album.artist_id = albumResponse.artist_id;
//     album.release_date = albumResponse.release_date;
//     album.cover_url = albumResponse.cover_url;
//     album.status = albumResponse.status;
//     album.created_at = albumResponse.created_at;
//     album.updated_at = albumResponse.updated_at;
//     album.description = albumResponse.description;
//     album.genre_id = albumResponse.genre_id;
//     album.deleted_at = albumResponse.deleted_at;

//     return album;
// }

// export function convertResponseToGenre(genreResponse: any): Genre {
//     const genre: Genre = { id: 0, name: '' }

//     genre.id = genreResponse.id;
//     genre.name = genreResponse.name;

//     return genre;
// }

// export function convertResponseToCommentUser(commentUserResponse: any): CommentUserResponse {
//     const commentUser: CommentUserResponse = { id: 0, image_url: '', username: '', role: { id: 0, name: '' } }

//     commentUser.id = commentUserResponse.id;
//     commentUser.image_url = commentUserResponse.image_url;
//     commentUser.username = commentUserResponse.username;
//     commentUser.role = convertResponseToRole(commentUserResponse.role);

//     return commentUser;
// }

// export function convertResponseToComment(commentResponse: any): Comment {
//     const comment: Comment = { id: 0, content: '', user_id: 0, user: convertResponseToCommentUser(commentResponse.user) }

//     comment.id = commentResponse.id;
//     comment.content = commentResponse.content;
//     comment.user_id = commentResponse.user_id;

//     return comment;
// }