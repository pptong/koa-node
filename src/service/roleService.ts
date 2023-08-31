import RoleDto from "../dto/roleDto";
import UserDto from "../dto/userDto";
export interface IRoleService
{
    getRoles(roleDto:RoleDto):Promise< Array<RoleDto>>;
    getAllRoles(roleDto:RoleDto):Promise< Array<RoleDto>>;
    getRoleById(roleDto: RoleDto): Promise<RoleDto>;
    createRole(roleDto: RoleDto):Promise<boolean>;
    updateRole(roleDto: RoleDto):Promise<boolean>;
    deleteRole(roleDto: RoleDto):Promise<boolean>;
}