import { RoleModel } from "@models/role.model";

export class RoleService {
    static async createRole(role: any) {
        const newRole = await RoleModel.create(role);
        return newRole;
    }

    static async getRoleById(id: string) {
        const role = await RoleModel.findById(id);
        return role;
    }

    static async getRoleByName(name: string) {
        const role = await RoleModel.findOne({ name });
        return role;
    }

    static async getAllRoles() {
        const roles = await RoleModel.find({ isActive: true });
        return roles;
    }

    static async updateRole(id: string, role: any) {
        const updatedRole = await RoleModel.findByIdAndUpdate(id, role, { new: true });
        return updatedRole;
    }

    static async deleteRole(id: string) {
        const role = await RoleModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        return role;
    }
}

