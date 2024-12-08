import { Role } from "./role";

export interface User {
    id: number;

    email: string;

    username: string;

    artist_name: string;

    password: string;

    country: string;

    date_of_birth: string;

    role: Role;

    biography: string;

    image_url: string;

    created_at: string;

    updated_at: string;
}   