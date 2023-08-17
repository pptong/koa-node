import RoleDto from "../dto/roleDto";
import UserDto from "../dto/userDto";
export interface IRoleService
{
    getRoles(roleDto:RoleDto):Promise< Array<RoleDto>>;
    getRolesByUserId(roleDto:UserDto):Promise<Array<RoleDto>>;
    getRoleById(roleDto:RoleDto):Promise< RoleDto>;
    getRolesByUserId(userdto: UserDto): Promise<Array<RoleDto>>;
    createRole(roleDto: RoleDto):Promise<boolean>;
    deleteRole(roleDto: RoleDto):Promise<boolean>;
}