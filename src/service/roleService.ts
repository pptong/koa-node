import PageResponseDto from "../dto/public/pageResponseDto";
import RoleDto from "../dto/roleDto";
import PageRequestDto from "../dto/public/pageRequestDto";
export interface IRoleService
{
    
    
    getRoles(pageDto: PageRequestDto): Promise<PageResponseDto<RoleDto>>;
    getAllRoles(roleDto:RoleDto):Promise< Array<RoleDto>>;
    getRoleById(roleDto: RoleDto): Promise<RoleDto>;
    createRole(roleDto: RoleDto):Promise<boolean>;
    updateRole(roleDto: RoleDto):Promise<boolean>;
    deleteRole(roleDto: RoleDto):Promise<boolean>;
}