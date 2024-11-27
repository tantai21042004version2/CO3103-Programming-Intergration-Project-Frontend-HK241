import { RoleResponse } from "./role.response";

export interface UserDetailResponse {
    id: number;
    username: string;
    email: string;
    country: string;
    date_of_birth: string;
    role: RoleResponse;
    active: boolean;
    image_url: string;
    created_at: string;
    updated_at: string;
}
