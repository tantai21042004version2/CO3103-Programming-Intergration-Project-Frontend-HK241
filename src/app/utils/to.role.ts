import { Role } from "../models/role";

export function convertResponseToRole(roleResponse: any): Role {
    const role: Role = { id: 0, name: '' }

    role.id = roleResponse.id;
    role.name = roleResponse.name;

    return role;
}