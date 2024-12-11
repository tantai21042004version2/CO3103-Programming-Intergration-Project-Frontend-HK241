import { Role } from '../models/role';
import { User } from '../models/user';

export function convertResponseToUser(response: any): User {
    const role: Role = {
        id: response.role.id,
        name: response.role.name
    };
    const user: User = {
        id: response.id,
        email: response.email,
        username: response.username,
        artist_name: response.artist_name,
        password: response.password,
        country: response.country,
        date_of_birth: response.date_of_birth,
        role: role,
        biography: response.biography,
        image_url: response.image_url,
        created_at: response.created_at,
        updated_at: response.updated_at
    };
    return user;
}